using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Linq;
using MongoDB.Driver.Builders;
using MongoDB.Driver.GeoJsonObjectModel;
using MongoDB.Bson.Serialization.IdGenerators;

using ComicClub;
using ComicClub.Models;
using System.Configuration;

namespace ComicClub.Controllers
{
    public class UserController : ApiController
    {
        [HttpGet]
        [Route("GetUsers")]
        public List<User> GetUsers()
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<User>("user");

            MongoCursor<User> korisnici = collection.FindAll();

            List<User> users = korisnici.ToList();
            return users;
        }

        [HttpGet]
        [Route("GetUserById/{idUser}")]
        public IHttpActionResult GetUserById(string idUser)
        {
            User user = new User();

            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<User>("user");

            var query = Query.EQ("_id", new ObjectId(idUser));
            user = collection.Find(query).First();
            return Ok(user);
        }

        [HttpGet]
        [Route("GetUserByName/{nicknameUser}")]
        public IHttpActionResult GetUserByName(string nicknameUser)
        {
            User user = new User();

            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<User>("user");

            var query = Query.EQ("nickname", nicknameUser);
            user = collection.Find(query).First();
            return Ok(user);
        }

        [HttpGet]
        [Route("GetUserByNameAndPassword/{nicknameUser}/{passwordUser}")]
        public IHttpActionResult GetUserByNameAndPassword(string nicknameUser, string passwordUser)
        {
            User user = new User();

            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<User>("user");

            var query = Query.And(
                Query.EQ("nickname", nicknameUser),
                Query.EQ("password", passwordUser)
                );
            if (collection.Find(query).Count() != 0)
                user = collection.Find(query).First();
            return Ok(user);
        }

        [HttpPost]
        public IHttpActionResult CreateUser(string nickname, string password, string picture)
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<User>("user");

            User user = new User { nickname = nickname, password = password, picture = picture, comicIdList = new List<ObjectId> { } };

            collection.Insert(user);

            return Ok();
        }

        [HttpPut]
        [Route("PutComicInUserList/{userId}/{comicId}")]
        public IHttpActionResult PutComicInUserList(string userId, string comicId)
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<User>("user");

            var query = Query.EQ("_id", new ObjectId(userId));
            var update = Update.PushWrapped("comicIdList", new ObjectId(comicId));

            collection.Update(query, update);

            return Ok();
        }
        [HttpPut]
        [Route("PullComicInUserList/{userId}/{comicId}")]
        public IHttpActionResult PullComicInUserList(string userId, string comicId)
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<User>("user");

            var query = Query.EQ("_id", new ObjectId(userId));
            var update = Update.PullWrapped("comicIdList", new ObjectId(comicId));

            collection.Update(query, update);

            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteUser(string userId)
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<User>("user");

            var query = Query.EQ("_id", new ObjectId(userId));

            collection.Remove(query);

            return Ok();
        }

    }
}
