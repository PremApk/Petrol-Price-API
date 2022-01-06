# Petrol Price API for India
Get Today's petrol prices for Indian states and districts

Note: Currently under Development, sometimes you will not get response! Will remove this line for stable version!!! Thanks

Live version : https://petrolpriceapi.herokuapp.com/ (or) https://petrol-price-api.herokuapp.com/

## API Endpoints :

Base URL: ```https://petrolpriceapi.herokuapp.com/``` (or) ```https://petrol-price-api.herokuapp.com/tamilnadu```
* GET ```/<state>```
List all petrol prices in the state for all districts

* GET ```/india```
List all petrol prices for major capital cities in India

Example:

```json
  {
    "City": "New Delhi",
    "Today's Price": " ₹ 103.97",
    "Yesterday's Price": " ₹ 103.97"
  },
  {
    "City": "Kolkata",
    "Today's Price": " ₹ 104.67",
    "Yesterday's Price": " ₹ 104.67"
  },
  {
    "City": "Mumbai",
    "Today's Price": " ₹ 109.98",
    "Yesterday's Price": " ₹ 109.98"
  },
  {
    "City": "Chennai",
    "Today's Price": " ₹ 101.40",
    "Yesterday's Price": " ₹ 101.51"
  },
  {
    "City": "Gurgaon",
    "Today's Price": " ₹ 95.56",
    "Yesterday's Price": " ₹ 95.90"
  },
  {
    "City": "Noida",
    "Today's Price": " ₹ 95.51",
    "Yesterday's Price": " ₹ 95.51"
  },
  {
    "City": "Bangalore",
    "Today's Price": " ₹ 100.58",
    "Yesterday's Price": " ₹ 100.58"
  }
  
```
For testing : https://rapidapi.com/a.premapk99@gmail.com/api/daily-petrol-price-in-india/

Source: https://www.goodreturns.in/petrol-price.html

Feel free to open an issue for any bugs/features.

Thank You :)
