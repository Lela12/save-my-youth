import environ
import os
from ninja import Router
from typing import List

from .models import Subscription, UserSubscription
from . import schema
import requests
import json


env = environ.Env(
    DEBUG=(bool, False)
)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))


subscription_router = Router(tags=["청약 API"])

@subscription_router.get('/{queryData}',
                        response={200: schema.OpenApiSchema},
                        summary="청약 가져오기",
                        auth=None,
                        )
def get_subscription(request, queryData: str):
    """
    ## subscription API 사용방법입니다.
    **default -> 기본 데이터 page=1, perPage=10**

    이외에는 공공 API와 동일하게 사용하면 됩니다.

    **기존 쿼리문의 첫 &은 생략합니다.**

    ex)page=3&perPage=15 이렇게 보내시면 됩니다.
    """

    serviceKey = env('OPEN_API')

    url = 'http://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail'  + f'?serviceKey={serviceKey}'

    if queryData == 'default':
        response = requests.get(url)

    else:
        response = requests.get(url + '&' + queryData)

    contents = json.loads(response.text)
    subscription_list = contents

    return 200, {'subscription_data': subscription_list}


like_router = Router(tags=["좋아요 API"])

# 청약 좋아요 개수와 사용자가 좋아요를 눌렀는지 상태 가져오기
@like_router.get('/{sub_id}',
                response={200: schema.LikeGetSchema},
                summary="청약 좋아요 가져오기",
                auth=None)
def get_like(request, sub_id: int):

    try:
        subscription = Subscription.objects.get(sub_id=sub_id)
        user_subscription = UserSubscription.objects.filter(
            user_subscription_id=subscription.id)

        if request.user.id != None:

            user = UserSubscription.objects.filter(
                user_subscription_id=subscription.id, user_id=request.user.id)

            if user:
                return 200, {'status': True, 'num': len(user_subscription)}

            else:
                return 200, {'status': False, 'num': len(user_subscription)}

        else:
            return 200, {'status': False, 'num': len(user_subscription)}

    except Subscription.DoesNotExist as e:
        return 404

# 좋아요가 눌러진 청약 리스트 가져오기
@like_router.get('/',
                response={200: List[schema.SubscriptionSchema]},
                summary="인기 청약 리스트",
                auth=None)
def get_like_list(request):

    subscriptions = Subscription.objects.all()

    for subscription in subscriptions:
        user_subscription = UserSubscription.objects.filter(user_subscription_id=subscription.id)
        subscription.like_num = len(user_subscription)

    return subscriptions


@like_router.post(
    '/',
    response={200: None},
    summary="청약 좋아요 누르기",
)
def post_like(request, data: schema.SubscriptionSchema):

    sub_id = data.sub_id
    name = data.name
    date = data.date

    user_subcription = UserSubscription.objects.create(user=request.user)

    try:
        subscription = Subscription.objects.get(sub_id=sub_id)
        subscription.user_subscription.add(user_subcription)
        subscription.save()

    except Subscription.DoesNotExist as e:
        subscription = Subscription.objects.create(sub_id=sub_id, name=name, date=date)
        subscription.user_subscription.add(user_subcription)
        subscription.save()

    return 200


@like_router.delete(
    '/',
    response={200: None},
    summary="청약 좋아요 지우기",
)
def delete_like(request, data: schema.LikeDeleteSchema):

    sub_id = data.sub_id
    subscription = Subscription.objects.get(sub_id=sub_id)
    user_subcription = UserSubscription.objects.get(
        user_id=request.user.id, user_subscription_id=subscription.id)

    user_subcription.delete()

    return 200
