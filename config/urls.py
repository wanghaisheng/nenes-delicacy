from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers 
from . import views


router = routers.DefaultRouter()
router.register(r'products', views.ItemView, basename='products')
router.register(r'glaze', views.GlazeView)
router.register(r'icings', views.IcingsView)
router.register(r'toppings', views.ToppingsView)
router.register(r'fillings', views.ToppingsView)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)