import { Route } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import {
    AssetFragment,
    CanDeactivateDetailGuard,
    CollectionFragment,
    createResolveData,
    detailBreadcrumb,
    GetProductWithVariantsQuery,
    PageComponent,
    PageService,
} from '@vendure/admin-ui/core';
import { map } from 'rxjs/operators';
import { ProductOptionsEditorComponent } from './components/product-options-editor/product-options-editor.component';
import { ProductVariantsEditorComponent } from './components/product-variants-editor/product-variants-editor.component';
import { ProductVariantsResolver } from './providers/routing/product-variants-resolver';

export const createRoutes = (pageService: PageService): Route[] => [
    {
        path: 'products',
        component: PageComponent,
        data: {
            locationId: 'product-list',
            breadcrumb: _('breadcrumb.products'),
        },
        children: pageService.getPageTabRoutes('product-list'),
    },
    {
        path: 'products/:id',
        component: PageComponent,
        data: {
            locationId: 'product-detail',
            breadcrumb: { label: _('breadcrumb.products'), link: ['../', 'products'] },
        },
        children: pageService.getPageTabRoutes('product-detail'),
    },
    {
        path: 'products/:productId/variants/:id',
        component: PageComponent,
        data: {
            locationId: 'product-variant-detail',
            breadcrumb: { label: _('breadcrumb.products'), link: ['../', 'products'] },
        },
        children: pageService.getPageTabRoutes('product-variant-detail'),
    },
    {
        path: 'products/:id/manage-variants',
        component: ProductVariantsEditorComponent,
        resolve: createResolveData(ProductVariantsResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: {
            breadcrumb: productVariantEditorBreadcrumb,
        },
    },
    {
        path: 'products/:id/options',
        component: ProductOptionsEditorComponent,
        resolve: createResolveData(ProductVariantsResolver),
        canDeactivate: [CanDeactivateDetailGuard],
        data: {
            breadcrumb: productOptionsEditorBreadcrumb,
        },
    },
    {
        path: 'facets',
        component: PageComponent,
        data: {
            locationId: 'facet-list',
            breadcrumb: _('breadcrumb.facets'),
        },
        children: pageService.getPageTabRoutes('facet-list'),
    },
    {
        path: 'facets/:id',
        component: PageComponent,
        data: {
            locationId: 'facet-detail',
            breadcrumb: { label: _('breadcrumb.facets'), link: ['../', 'facets'] },
        },
        children: pageService.getPageTabRoutes('facet-detail'),
    },
    {
        path: 'collections',
        component: PageComponent,
        data: {
            locationId: 'collection-list',
            breadcrumb: _('breadcrumb.collections'),
        },
        children: pageService.getPageTabRoutes('collection-list'),
    },
    {
        path: 'collections/:id',
        component: PageComponent,
        data: {
            locationId: 'collection-detail',
            breadcrumb: { label: _('breadcrumb.collections'), link: ['../', 'collections'] },
        },
        children: pageService.getPageTabRoutes('collection-detail'),
    },
    {
        path: 'assets',
        component: PageComponent,
        data: {
            locationId: 'asset-list',
            breadcrumb: _('breadcrumb.assets'),
        },
        children: pageService.getPageTabRoutes('asset-list'),
    },
    {
        path: 'assets/:id',
        component: PageComponent,
        data: {
            locationId: 'asset-detail',
            breadcrumb: { label: _('breadcrumb.assets'), link: ['../', 'assets'] },
        },
        children: pageService.getPageTabRoutes('asset-detail'),
    },
];

export function productVariantEditorBreadcrumb(data: any, params: any) {
    return data.entity.pipe(
        map((entity: any) => [
            {
                label: _('breadcrumb.products'),
                link: ['../', 'products'],
            },
            {
                label: `${entity.name}`,
                link: ['../', 'products', params.id, { tab: 'variants' }],
            },
            {
                label: _('breadcrumb.manage-variants'),
                link: ['manage-variants'],
            },
        ]),
    );
}

export function productOptionsEditorBreadcrumb(data: any, params: any) {
    return data.entity.pipe(
        map((entity: any) => [
            {
                label: _('breadcrumb.products'),
                link: ['../', 'products'],
            },
            {
                label: `${entity.name}`,
                link: ['../', 'products', params.id, { tab: 'variants' }],
            },
            {
                label: _('breadcrumb.product-options'),
                link: ['options'],
            },
        ]),
    );
}
