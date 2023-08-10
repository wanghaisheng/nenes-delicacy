from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers 
from . import views


router = routers.DefaultRouter()
router.register(r'products', views.ProductView, basename='products')
router.register(r'cart', views.CartView, basename='cart')
router.register(r'categories', views.ProductTypeView, basename='categories')
router.register(r'icings', views.IcingView, basename='icings')
router.register(r'toppings', views.ToppingView, basename='toppings')
router.register(r'size', views.SizeView, basename='size')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)