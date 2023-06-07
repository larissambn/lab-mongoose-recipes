const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.js');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = `mongodb://127.0.0.1:27017/recipe-app`;

// Connection to the database "recipe-app"
mongoose
  .set('strictQuery', true)
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to the database: "${mongoose.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Iteration 2 - Create a recipe
    Recipe.create({
      title: 'Spaghetti Carbonara',
      level: 'Easy Peasy',
      ingredients: ['spaghetti', 'eggs', 'bacon', 'parmesan cheese', 'black pepper'],
      cuisine: 'Italian',
      dishType: 'Main Course',
      duration: 30,
      creator: 'Unknown',
    })
      .then((recipe) => {
        console.log(`Created recipe: ${recipe.title}`);
      })
      .catch((err) => {
        console.error('Error creating recipe:', err);
      });

    // Iteration 3 - Insert Many recipes
    Recipe.insertMany(data)
      .then((recipes) => {
        console.log('Inserted recipes:');
        recipes.forEach((recipe) => {
          console.log(recipe.title);
        });
      })
      .catch((err) => {
        console.error('Error inserting recipes:', err);
      });

    // Iteration 4 - Update recipe
    Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then(() => {
        console.log('Updated duration for Rigatoni alla Genovese');
      })
      .catch((err) => {
        console.error('Error updating recipe:', err);
      });

    // Iteration 5 - Remove a recipe
    Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(() => {
        console.log('Removed Carrot Cake');
      })
      .catch((err) => {
        console.error('Error removing recipe:', err);
      });

    // Iteration 6 - Close the Database
    mongoose.connection
      .close()
      .then(() => {
        console.log('Database connection closed.');
      })
      .catch((err) => {
        console.error('Error closing database connection:', err);
      });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
