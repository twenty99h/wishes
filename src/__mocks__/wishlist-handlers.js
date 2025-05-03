import { http, HttpResponse } from 'msw';

const API_PREFIX = '/api/v1/wishlist';

const wishlistDB = new Map([
  [
    1,
    {
      id: 1,
      title: 'All',
      deletable: true,
    },
  ],
  [
    2,
    {
      id: 2,
      title: 'Fulfilled',
      deletable: true,
    },
  ],
  [
    3,
    {
      id: 3,
      title: 'Not Fulfilled',
      deletable: true,
    },
  ],
  [
    4,
    {
      id: 4,
      title: 'Electronics',
      deletable: true,
    },
  ],
]);

let nextWishlistId = Array.from(wishlistDB.keys()).length + 1;

export const wishlistHandlers = [
  http.get(`${API_PREFIX}`, async () => {
    const wishlists = Array.from(wishlistDB.values());
    await new Promise((res) => setTimeout(res, 500));
    return HttpResponse.json({ wishlists, wishlistId: wishlists[0]?.id || null });
  }),

  http.get(`${API_PREFIX}/:id`, ({ params }) => {
    const id = Number(params.id);
    const wishlist = wishlistDB.get(id);

    if (!wishlist) {
      return new HttpResponse(null, { status: 404 });
    }

    if (wishlistDB.size === 1) {
      return HttpResponse.json({ ...wishlist, deletable: false });
    }

    return HttpResponse.json(wishlist);
  }),

  http.post(`${API_PREFIX}`, async ({ request }) => {
    const wishlistData = await request.json();

    const newWishlist = {
      id: nextWishlistId++,
      title: wishlistData.title,
    };

    wishlistDB.set(newWishlist.id, newWishlist);

    return HttpResponse.json(newWishlist, { status: 201 });
  }),

  http.put(`${API_PREFIX}/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const existingWishlist = wishlistDB.get(id);

    if (!existingWishlist) {
      return new HttpResponse(null, { status: 404 });
    }

    const wishTabData = await request.json();

    const updatedWishTab = {
      ...existingWishlist,
      ...wishTabData,
      id,
    };

    wishlistDB.set(id, updatedWishTab);

    return HttpResponse.json(updatedWishTab);
  }),

  http.delete(`${API_PREFIX}/:id`, ({ params }) => {
    const id = Number(params.id);

    if (!wishlistDB.has(id)) {
      return new HttpResponse(null, { status: 404 });
    }

    let nextId = null;
    if (wishlistDB.has(id - 1)) {
      nextId = id - 1;
    } else if (wishlistDB.has(id + 1)) {
      nextId = id + 1;
    }

    console.log(nextId);

    wishlistDB.delete(id);

    return HttpResponse.json({ id, nextId });
  }),
];
