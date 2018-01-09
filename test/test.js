var supertest = require("supertest");
var should = require("should");
const config = require('../config.js');

// This agent refers to PORT where program is runninng.
var server = supertest.agent(config.url);

// UNIT test begin
describe("Create Session",function(){
  this.timeout(15000);
  // #1 should return home page
  it("Ping server",function(done){
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

  it("Login user", function(done){
    server
    .post("/api/login")
    // .set('Accept','application/json')
    .send({"email": "wardhanster@gmail.com", "password": "harsh"})
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });
});

describe("Read APIs",function(){
  this.timeout(15000);

  it("Get Users",function(done){
    server
    .get("/api/user/0/10")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });

  it("Get Account Types",function(done){
    server
    .get("/api/grab/account-types")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });

  it("Get Companies",function(done){
    server
    .get("/api/getCompanies/0/10")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });

  it("Get My Files",function(done){
    server
    .get("/api/myFiles")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });

});
