from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers 
from . import views

router = routers.DefaulRouter()
router.register(r'cakes', views.CakeView)
router.register(r'pastery', views.PasteryView)
router.register(r'savoury', views.SavouryView)
router.register(r'glaze', views.GlazeView)
router.register(r'icings', views.IcingsView)
router.register(r'toppings', views.ToppingsView)
router.register(r'fillings', views.ToppingsView)


urlpatterns = [
    path('api/', include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)