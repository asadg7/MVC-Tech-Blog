const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
    secret: "I like oreos",
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const sequelize = require("./config/connection");
const routes = require("./controllers");

const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}!`));
});