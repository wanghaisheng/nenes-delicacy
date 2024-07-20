from django.urls import path, include
from rest_framework import routers 
from . import views


router = routers.DefaultRouter()
router.register(r'products', views.ProductView, basename='products')
router.register(r'states', views.StatesView, basename='states')
router.register(r'cart', views.CartView, basename='cart')
router.register(r'categories', views.ProductTypeView, basename='categories')
router.register(r'shipping', views.ShippingView, basename='shipping')
router.register(r'icings', views.IcingView, basename='icings')
router.register(r'toppings', views.ToppingView, basename='toppings')
router.register(r'size', views.SizeView, basename='size')
router.register(r'email', views.EmailsView, basename='email')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

