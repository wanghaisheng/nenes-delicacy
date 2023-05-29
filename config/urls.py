from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers 
from . import views

router = routers.DefaulRouter()
router.register(r'cakes', views.CakeView, 'cakes')
router.register(r'snacks', views.SnackView, 'snacks')
router.register(r'chops', views.ChopsView, 'chops')
router.register(r'flavours', views.ChopsView, 'chops')
router.register(r'icings', views.ChopsView, 'chops')
router.register(r'toppings', views.ChopsView, 'chops')

urlpatterns = [
    path('api/', include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)