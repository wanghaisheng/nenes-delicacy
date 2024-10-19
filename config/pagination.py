from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3
    max_page_size = 3
    def get_paginated_response(self, data):
        response_data = {
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        }

        if len(data) != 0:
            response_data['category'] = data[0]['product_type']
        response_data['page_size'] = self.page_size
        return Response(response_data) 