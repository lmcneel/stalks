/**
 * This is a seed script for testing mongo db
 */
// const mongoose = require('mongoose');
const Doc = require('../models/mongo/doc');

/**
 * Doc data to seed
 */
let docData = [
  {
    title: 'General Stock Market Knowledge',
    article: [
      {
        'sub': 'ROI - Return on Investment',
        'par': 'ROI is the ratio between the net profit and cost of investment resulting from an investment of a stock. This is a helpful metric to determine if your investment in a stock is performing well. The higher this number, the better that stock is doing. You can also use this simple metric to compare different stocks in your portfolio.'
      },
      {
        'sub': 'Shares',
        'par': 'A share is an indivisible unit of capital, expressing the ownership relationship between the company and the shareholder, which is you. Shares are valued according to various principles in different markets, but a basic premise is that a share is worth the price at which a transaction would be likely to occur were the shares are to be sold. This changes many times throughout the trading day which is from XX to XX. '
      },
      {
        'sub': 'Percentage Change',
        'par': 'You will see this value listed next to the price per share and it will be in either green or red to indicate positive or negative performance since the opening of the trading day. '
      },
      {
        'sub': 'Ticker Symbol',
        'par': 'A ticker symbol or stock symbol is an abbreviation used to uniquely identify publicly traded shares of a particular stock on a particular stock market. A stock symbol may consist of letters, numbers or a combination of both.'
      },
    ],
    img: 'img url, currently unused, future dev',
    keywords: ['helpful', 'keywords', 'currently unused, future dev'],
    language: 'english',
    helpfulNo: 0,
    helpfulYes: 0,
  },
  {
    title: 'Petfolio',
    article: [
      {
        'sub': 'Portfolio Value',
        'par': 'This element is the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets.'
      },
      {
        'sub': 'Bank Value',
        'par': 'This element shows the amount of liquid assets, money, that you can use to invest in stocks or spend on your pet for fun items in the shop. When you start the game you have a set amount of $10,000 in your account to start building your petfolio. You can increase your liquid assets by selling your stocks as well as login bonuses.'
      },
      {
        'sub': 'Owned Stocks',
        'par': 'This is a list of all the stocks you currently have in your petfolio. Each entry displays the current price, which updates every XX minutes. The red or green percentage next to the value amount represents the growth or decline of the stock as compared to the previous day. The eye icon allows you to add the stock to your watchlist, which will scroll across the top on the page so you can keep an eye on it. You also have the option to buy or sell your stocks from here'
      },
      {
        'sub': 'Pie Chart',
        'par': 'This shows the distribution of total stocks you hold. Each piece represents an individual company in which you own stocks and the entire chart represents your entire petfolio. Use this as a tool to diversify your petfolio. '
      },
    ],
    img: 'img url, currently unused, future dev',
    keywords: ['helpfull', 'keywords', 'currently unused, future dev'],
    language: 'english',
    helpfulNo: 0,
    helpfulYes: 0,
  },
  {
    title: 'Pet Center',
    article: [
      {
        'sub': 'Pet Death',
        'par': 'After a certain amount of days, your animal dies/runs away and you lose a certain amount of money every day until you pay a larger sum to revive it, you stop at zero'
      },
      {
        'sub': 'Overall Health',
        'par': 'This bar represents the overall happiness, fondness, and hunger of your pet. If this bar is getting low, you may want to look at the sub categories and see if your pet is sad, lonely, or hungry. Buying and trading stocks will help you take care of your pet but you can also use items in the shop for extra help.'
      },
      {
        'sub': 'Happiness',
        'par': 'The happiness level of your pet is a direct reflection of your return on investment, ROI, which is the ratio between the net profit and cost of investment resulting from an investment of a stock. In simpler terms, the better your stocks do, the happy your pet will be. There are also toys and treats in the shop which will make your pet very happy.'
      },
      {
        'sub': 'Fondness',
        'par': 'The more you check in on your pet, the more fond your pet will be of you. If you plan on going on a long vacation, you might want to checkout the toys and treats in the shop to maintain your pets fondness while you are away.'
      },
      {
        'sub': 'Hunger',
        'par': 'Just like a real pet, your little fluff ball needs to eat too. A complete bar means they are full but that will slowly drop. The shop has all the meals you need for your pet, just make sure you stop by before they get too hungry and start munching on your money instead!'
      },
      {
        'sub': 'Items',
        'par': 'In the shop you can buy an array of wearable items and yummy treats. You can collect all the items but you can only equip one at a time. Each has a powerful buff that will help you conquer the stock market. Different items will help with different goals. Keep an eye on the colors for a clue about what they do. Treats are a one time boost for your pet that helps in one of the three categories.'
      },
    ],
    img: 'img url, currently unused, future dev',
    keywords: ['helpfull', 'keywords', 'currently unused, future dev'],
    language: 'english',
    helpfulNo: 0,
    helpfulYes: 0,
  },
  {
    title: 'Trade Center',
    article: [
      {
        'sub': 'Search Stocks',
        'par': 'You can search for stocks using their ticker symbol. A ticker symbol or stock symbol is an abbreviation used to uniquely identify publicly traded shares of a particular stock on a particular stock market. A stock symbol may consist of letters, numbers or a combination of both.'
      },
      {
        'sub': 'Buying and Selling',
        'par': 'Trading stocks on the market consists of buying and selling. You can see the value of the stock and decide how many shares you would like to trade. '
      },
      {
        'sub': 'Watchlist',
        'par': 'Using the eye icon you can add stocks you own or just ones that you are interested in to your watchlist. This will scroll across the top of the page so you can keep an eye on the price per share and the percentage change. You can use this tool to decide when to buy new stocks or sell the ones you have.'
      },

    ],
    img: 'img url, currently unused, future dev',
    keywords: ['helpfull', 'keywords', 'currently unused, future dev'],
    language: 'english',
    helpfulNo: 0,
    helpfulYes: 0,
  },
  {
    title: 'Friends',
    article: [
      {
        'sub': 'Friends',
        'par': 'You can search for friends using their usernames. You can add them to your friends list to compare scores with them. From your friends list you can remove them if you need to'
      },
      {
        'sub': 'Leaderboard',
        'par': 'The leaderboard will be used to compare scores amongst your friends. Your score will be based on your petfolio value.'
      },
      {
        'sub': 'Forum',
        'par': 'You can communicate with one another using the forum. You can create a new post or comment on another user’s post. In the forum, you can ask question, connect with the community, and seek advice about how to grow your petfolio!'
      },
    ],
    img: 'img url, currently unused, future dev',
    keywords: ['helpfull', 'keywords', 'currently unused, future dev'],
    language: 'english',
    helpfulNo: 0,
    helpfulYes: 0,
  },
];
/**
 * fucntion to seed doc database
 */
function seedDB() {
  // Remove all users
  Doc.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    // add a few users
    docData.forEach(function (seed) {
      Doc.create(seed, function (err, user) {
        if (err) {
          console.log(err);
        } else {
          console.log('Created a Doc');
        }
      });
    });
  });
};


module.exports = seedDB;

