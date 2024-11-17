def filter_products(filter, queryset):

    if filter == 'desc':
        queryset = queryset.order_by('-unit_price')

    elif filter == 'asc':
        queryset = queryset.order_by('unit_price')
    else:
        queryset = queryset.order_by('id')

    return queryset