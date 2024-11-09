const express = require("express");
const router = express.Router();
const userRoute = require("./userRoutes");
const docsRoute = require('./docs.route');
const contactRoute = require('./contactRoute');
const projectRoute = require('./projectRoute');
const clientRoute = require('./clientRoutes');
const newsLetterRoute = require('./newsLetterRoute');

const Routes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
  {
    path: '/project',
    route: projectRoute,
  },
  {
    path: '/client',
    route: clientRoute,
  },
  {
    path: '/newsletter',
    route: newsLetterRoute,
  },
];

Routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
