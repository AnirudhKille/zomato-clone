require("dotenv").config();
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const https = require("https");
const PaytmChecksum = require("./PaytmChecksum");
const nodemailer = require("nodemailer");
const axios = require("axios");
const { google } = require("googleapis");

var MyApp = {};
var Client_ID =
  "754535854838-dkjt61msnba8visi1uie4udh10po7u8j.apps.googleusercontent.com";
var Client_secret = "raUwEuGnUF_WmGJCS8gzWDQ7";
var Redirect_uri = "https://developers.google.com/oauthplayground";
var Refresh_token =
  "1//04lZG9LKTuavTCgYIARAAGAQSNwF-L9Irl70THShSgJxmhuDLw6jff5KCRqhzw9ebH5CE3JESFq1pFsFlLMsNgULD7C1Zznu5rzc";

const oAuthzclient = new google.auth.OAuth2(
  Client_ID,
  Client_secret,
  Redirect_uri
);
oAuthzclient.setCredentials({ refresh_token: Refresh_token });

exports.payment = (req, res) => {
  var { amount, email, number, postaddress, orderdetails } = req.body;
  console.log(amount, email, number, postaddress, orderdetails);
  console.log(typeof orderdetails);

  MyApp.email = email;
  MyApp.amount = amount;
  MyApp.number = number;
  MyApp.postaddress = postaddress;
  MyApp.orderdetails = orderdetails;

  console.log(MyApp);
  console.log(MyApp.orderdetails.map((item) => item.name));
  console.log(MyApp.orderdetails.map((item) => item.image));
  var image1 = MyApp.orderdetails.map((item) => item.image).toString();
  console.log(`../${image1}`);

  /* import checksum generation utility */
  const totalAmount = JSON.stringify(amount);
  var params = {};

  /* initialize an array */
  (params["MID"] = process.env.PAYTM_MID),
    (params["WEBSITE"] = process.env.PAYTM_WEBSITE),
    (params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID),
    (params["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID),
    (params["ORDER_ID"] = uuidv4()),
    (params["CUST_ID"] = process.env.PAYTM_CUST_ID),
    (params["TXN_AMOUNT"] = totalAmount),
    (params["CALLBACK_URL"] =
      "https://zomoto-clone-backend-code-api.herokuapp.com/callback"),
    (params["EMAIL"] = email),
    (params["MOBILE_NO"] = process.env.MOBILE_NUMBER);

  /**
   * Generate checksum by parameters we have
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  var paytmChecksum = PaytmChecksum.generateSignature(
    params,
    process.env.PAYTM_MERCHANT_KEY
  );
  paytmChecksum
    .then(function (checksum) {
      let paytmParams = {
        ...params,
        CHECKSUMHASH: checksum,
      };
      res.json(paytmParams);
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.callback = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, file) => {
    paytmChecksum = fields.CHECKSUMHASH;
    delete fields.CHECKSUMHASH;

    var isVerifySignature = PaytmChecksum.verifySignature(
      fields,
      process.env.PAYTM_MERCHANT_KEY,
      paytmChecksum
    );
    if (isVerifySignature) {
      var paytmParams = {};
      paytmParams["MID"] = fields.MID;
      paytmParams["ORDERID"] = fields.ORDERID;

      /*
       * Generate checksum by parameters we have
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */
      PaytmChecksum.generateSignature(
        paytmParams,
        process.env.PAYTM_MERCHANT_KEY
      ).then(function (checksum) {
        paytmParams["CHECKSUMHASH"] = checksum;

        var post_data = JSON.stringify(paytmParams);
        var options = {
          hostname: "securegw-stage.paytm.in",
          port: 443,
          path: "/order/status",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var status = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });
          post_res.on("end", function () {
            if (MyApp.orderdetails.length <= 1) {
              var finalstatus = response.slice(139, 161);
              console.log(finalstatus);
              var finalstatus1 = finalstatus.slice(10, 21);
              console.log(finalstatus1);
              var finalstatus2 = finalstatus1.toString();
            } else {
              var finalstatus = response.slice(140, 161);
              console.log(finalstatus);
              var finalstatus1 = finalstatus.slice(10, 21);
              console.log(finalstatus1);
              var finalstatus2 = finalstatus1.toString();
            }
            if (finalstatus2 == "TXN_SUCCESS") {
              var itemsname = MyApp.orderdetails
                ? MyApp.orderdetails.map((item) => item.name)
                : null;
              var itemsname2 = itemsname.toString();
              var itemsqty = MyApp.orderdetails
                ? MyApp.orderdetails.map((item) => item.qty)
                : null;
              var itemsqty2 = itemsqty.toString();

              var message =
                '<h1 style="color:red;">Orderdetails</h1>' +
                '<table style="border:1px solid #333;">' +
                "<thead>" +
                "<th> Email </th>" +
                "<th> Number</th>" +
                "<th> Address</th>" +
                "<th> Amount</th>" +
                "<th> Item Name</th>" +
                "<th> Item Qty</th>" +
                "<th> Payment Status</th>" +
                "</thead>" +
                "<tr>" +
                "<td>" +
                MyApp.email +
                "</td>" +
                "<td>" +
                MyApp.number +
                "</td>" +
                "<td>" +
                MyApp.postaddress +
                "</td>" +
                "<td>" +
                MyApp.amount +
                "</td>" +
                "<td>" +
                itemsname2 +
                "</td>" +
                "<td>" +
                itemsqty2 +
                "</td>" +
                "<td>" +
                "Success" +
                "</td>" +
                "<tr/>" +
                "</table>";

              axios({
                method: "POST",
                url: "https://zomoto-clone-backend-code-api.herokuapp.com/orderdetails",
                headers: { "Content-Type": "application/json" },
                data: MyApp,
              })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => console.log(error));

              //mail transport method
              const accessToken = oAuthzclient.getAccessToken();
              const transport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                  type: "OAuth2",
                  user: "akashronad48@gmail.com",
                  clientId: Client_ID,
                  clientSecret: Client_secret,
                  refreshToken: Refresh_token,
                  accessToken: accessToken,
                },
              });

              const mailOptions = {
                from: "anirudhkille@gmail.com",
                to: MyApp.email,
                subject: "Your Order Has Shipped!",
                text: "Order Details ",
                html: message,
                attachments: [
                  {
                    filename: "image",
                    path: "E:\\Edurek Intership\\React Js\\zomto-clone\\src\\Assets\\Menu-Photo.jpg",
                  },
                ],
              };

              transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(`Message sent : ${info.response}`);
                }
              });

              res.sendFile(__dirname + "/response.html");
            } else {
              res.sendFile(__dirname + "/failure.html");
            }
          });
        });
        post_req.write(post_data);
        post_req.end();
      });
    } else {
      console.log("Checksum Mismatched");
    }
  });
};
