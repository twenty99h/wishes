import { http, HttpResponse } from 'msw';

const API_PREFIX = '/api/v1/wishes';

// Create a Map to store wishes, where key is wishlistId and value is array of wishes
const wishesDB = new Map();

// Initialize some mock wishes for each wishlist
const initializeMockWishes = () => {
  // Create 30 wishes and distribute them across wishlists
  const wishes = Array(30)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      wishlistId: Math.floor(i / 10) + 1, // Distribute wishes across 3 wishlists
      title: `Wish ${i + 1}`,
      description: `Description ${i + 1}`,
      price: { amount: (i + 1) * 1000, currency: 'RUB' },
      isVisible: true,
      isFulfilled: i % 3 === 0, // Every third wish is fulfilled
      reservedBy: undefined,
      productUrl: undefined,
      imageUrl: `https://picsum.photos/${i + 1}00`,
    }));

  // Group wishes by wishlistId
  wishes.forEach((wish) => {
    const wishlistWishes = wishesDB.get(wish.wishlistId) || [];
    wishlistWishes.push(wish);
    wishesDB.set(wish.wishlistId, wishlistWishes);
  });
};

initializeMockWishes();

export const wishesListHandlers = [
  // Get all wishes for a specific wishlist
  http.get(`${API_PREFIX}`, async ({ request }) => {
    const url = new URL(request.url);
    const wishlistId = Number(url.searchParams.get('wishlistId'));

    if (!wishlistId) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'wishlistId query parameter is required',
      });
    }

    const wishes = wishesDB.get(wishlistId) || [];
    await new Promise((res) => setTimeout(res, 500));
    return HttpResponse.json(wishes);
  }),

  // Get a specific wish by ID
  http.get(`${API_PREFIX}/:id`, ({ params }) => {
    const id = Number(params.id);
    let foundWish = null;

    // Search through all wishlists to find the wish
    for (const wishes of wishesDB.values()) {
      const wish = wishes.find((w) => w.id === id);
      if (wish) {
        foundWish = wish;
        break;
      }
    }

    if (!foundWish) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(foundWish);
  }),

  // Create a new wish
  http.post(`${API_PREFIX}`, async ({ request }) => {
    const wishData = await request.json();
    const wishlistId = wishData.wishlistId;

    if (!wishlistId) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'wishlistId is required',
      });
    }

    const wishlistWishes = wishesDB.get(wishlistId) || [];
    const newWish = {
      id: Math.max(...wishlistWishes.map((w) => w.id), 0) + 1,
      ...wishData,
      isVisible: true,
      isFulfilled: false,
      reservedBy: undefined,
      productUrl: undefined,
      imageUrl: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
    };

    wishlistWishes.push(newWish);
    wishesDB.set(wishlistId, wishlistWishes);

    return HttpResponse.json(newWish, { status: 201 });
  }),

  // Update a wish
  http.put(`${API_PREFIX}/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const wishData = await request.json();
    let foundWish = null;
    let foundWishlistId = null;

    // Find the wish and its wishlist
    for (const [wishlistId, wishes] of wishesDB.entries()) {
      const wishIndex = wishes.findIndex((w) => w.id === id);
      if (wishIndex !== -1) {
        foundWish = wishes[wishIndex];
        foundWishlistId = wishlistId;
        break;
      }
    }

    if (!foundWish) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedWish = {
      ...foundWish,
      ...wishData,
      id,
    };

    // Update the wish in the database
    const wishes = wishesDB.get(foundWishlistId);
    const wishIndex = wishes.findIndex((w) => w.id === id);
    wishes[wishIndex] = updatedWish;

    return HttpResponse.json(updatedWish);
  }),

  // Delete a wish
  http.delete(`${API_PREFIX}/:id`, ({ params }) => {
    const id = Number(params.id);
    let foundWishlistId = null;

    // Find the wishlist containing the wish
    for (const [wishlistId, wishes] of wishesDB.entries()) {
      if (wishes.some((w) => w.id === id)) {
        foundWishlistId = wishlistId;
        break;
      }
    }

    if (!foundWishlistId) {
      return new HttpResponse(null, { status: 404 });
    }

    // Remove the wish from the database
    const wishes = wishesDB.get(foundWishlistId);
    const updatedWishes = wishes.filter((w) => w.id !== id);
    wishesDB.set(foundWishlistId, updatedWishes);

    return new HttpResponse(null, { status: 204 });
  }),
];
