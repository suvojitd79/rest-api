# Fyle BE Coding Challenge: Banks Search Application (v1)

### Introduction
A REST service that can fetch bank details, using the data given in the API’s query parameters. 

----------

### GET API to fetch a bank details, given branch IFSC code


> GET
<kbd>/details</kbd>

> Authentication
<kbd>jwt</kbd>

Query String

key     | type   | value     | req/opt
-----   |------  | -------   | ---------
ifsc    | string | ifsc_code | required


> Try it out 1

```
https://fyle-rest.herokuapp.com/details?ifsc=ALLA0210056
```
```
curl -X GET \
  'https://fyle-rest.herokuapp.com/details?ifsc=ALLA0210056' \
  -H 'Content-Type: application/json' \
  -H 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWYxOWJkZWUtNWM3Yy00ZGU1LThiODYtMzZiMTRiYzk0MWQyIiwiaWF0IjoxNTYwNTcwMTcwLCJleHAiOjE1NjEwMDIxNzB9.r_IWaHpRykOzW4gXlpUbIX6C34gtQmqjtZvoKkWOM-I' \
```
```
{
    "id": "11",
    "ifsc": "ALLA0210056",
    "bank_id": "11",
    "branch": "DIMAPUR BRANCH",
    "address": "KALIBARI ROAD, DIMAPUR-797112",
    "city": "DIMAPUR",
    "district": "DIMAPUR",
    "state": "NAGALAND",
    "name": "ALLAHABAD BANK"
}
```


### GET API to fetch a bank details, given branch IFSC code



> GET
<kbd>/details</kbd>

> Authentication
<kbd>jwt</kbd>


Query String

key     | type    | value     | req/opt
-----   |------   | -------   | ---------
bname   | string  | bank name | required
city    | string  | city name | required
limit   | integer | >=0       | optional
offset  | integer  | >=0       | optional



> Try it out 1


```
https://fyle-rest.herokuapp.com/details?bname=ABHYUDAYA COOPERATIVE BANK LIMITED&city=MUMBAI
```
```
curl -X GET \
  'https://fyle-rest.herokuapp.com/details?bname=ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED&city=MUMBAI' \
  -H 'Content-Type: application/json' \
  -H 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWYxOWJkZWUtNWM3Yy00ZGU1LThiODYtMzZiMTRiYzk0MWQyIiwiaWF0IjoxNTYwNTcwMTcwLCJleHAiOjE1NjEwMDIxNzB9.r_IWaHpRykOzW4gXlpUbIX6C34gtQmqjtZvoKkWOM-I' \
 ```
 
```
[
    {
        "id": "60",
        "ifsc": "ABHY0065001",
        "bank_id": "60",
        "branch": "RTGS-HO",
        "address": "ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024",
        "city": "MUMBAI",
        "district": "GREATER MUMBAI",
        "state": "MAHARASHTRA",
        "name": "ABHYUDAYA COOPERATIVE BANK LIMITED"
    },
    {
    ................
    
    }   
]
```

> Try it out 2(optional parameters are given)

```
https://fyle-rest.herokuapp.com/details?bname=ABHYUDAYA COOPERATIVE BANK LIMITED&city=MUMBAI&limit=2&offset=3
```

```
curl -X GET \
  'https://fyle-rest.herokuapp.com/details?bname=ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED&city=MUMBAI&limit=2&offset=3' \
  -H 'Content-Type: application/json' \
  -H 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWYxOWJkZWUtNWM3Yy00ZGU1LThiODYtMzZiMTRiYzk0MWQyIiwiaWF0IjoxNTYwNTcwMTcwLCJleHAiOjE1NjEwMDIxNzB9.r_IWaHpRykOzW4gXlpUbIX6C34gtQmqjtZvoKkWOM-I' \
```



```
[
    {
        "id": "60",
        "ifsc": "ABHY0065004",
        "bank_id": "60",
        "branch": "BHANDUP",
        "address": "CHETNA APARTMENTS, J.M.ROAD, BHANDUP, MUMBAI-400078",
        "city": "MUMBAI",
        "district": "GREATER MUMBAI",
        "state": "MAHARASHTRA",
        "name": "ABHYUDAYA COOPERATIVE BANK LIMITED"
    },
    {
        "id": "60",
        "ifsc": "ABHY0065005",
        "bank_id": "60",
        "branch": "DARUKHANA",
        "address": "POTIA IND.ESTATE, REAY ROAD (E), DARUKHANA, MUMBAI-400010",
        "city": "MUMBAI",
        "district": "GREATER MUMBAI",
        "state": "MAHARASHTRA",
        "name": "ABHYUDAYA COOPERATIVE BANK LIMITED"
    }
]
```





----------

### Overview

> * All the routes are private, jwt protected so to access those routes one auth-token is needed to be attached in the header with the request.
> * Data is case sensitive so city=MUMBAI and city=mumbai will give different results.
----------


### Authentication
To use the API, one should request for a jwt and then the token should be attached with the header when the request is to be made. 


API request for a token
```
https://fyle-rest.herokuapp.com/token
```
expected response
```
{"token":"xxxxxxxxx123xxxYOURxxxTOKENxxxx","expiresIn":"5 days"}
```
attach the token in the header using **auth-token** as your jwt key.
```
auth-token=token
```
![screen shot of jwt](https://i.ibb.co/KjpJR8L/Screenshot-from-2019-06-15-09-04-52.png "Title is optional")

----------


### Error Codes

HTTP Status Code  | Description
----------------  | -------------
400               | Bad Request- Bad input parameters provided
401               | Unauthorized-The client passed in the invalid Auth token. Client should refresh the token and then try again.




## To test the API, please use clients like postman,vREST where one can attach the jwt in the header




