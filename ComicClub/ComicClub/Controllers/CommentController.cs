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

using ComicClub;
using ComicClub.Models;

namespace ComicClub.Controllers
{
    public class CommentController : ApiController
    {
        [HttpGet]
        [Route("GetComments")]
        public List<Comment> GetComments()
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comment>("comment");

            MongoCursor<Comment> komentari = collection.FindAll();

            List<Comment> comments = komentari.ToList();
            return comments;
        }

        [HttpGet]
        [Route("GetCommentsByUser/{userId}")]
        public List<Comment> GetCommentsByUser(string userId)
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comment>("comment");

            var query = Query.EQ("idUserComm", new ObjectId(userId));

            MongoCursor<Comment> komentari = collection.Find(query);

            List<Comment> comments = komentari.ToList();
            return comments;
        }

        [HttpGet]
        [Route("GetCommentsByComic/{comicId}")]
        public List<Comment> GetCommentsByComic(string comicId)
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comment>("comment");

            var query = Query.EQ("idComicComm",comicId);

            MongoCursor<Comment> komentari = collection.Find(query);

            List<Comment> comments = komentari.ToList();
            return comments;
        }

        [HttpPost]
        public IHttpActionResult createComment([FromBody] Comment comment)
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comment>("comment");

            collection.Insert(comment);

            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteComment(string commentId)
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comment>("comment");

            var query = Query.EQ("_id", new ObjectId(commentId));

            collection.Remove(query);

            return Ok();
        }

    }
}
