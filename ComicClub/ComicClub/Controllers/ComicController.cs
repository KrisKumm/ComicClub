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
    public class ComicController : ApiController
    {
        [HttpGet]
        [Route("GetComics")]
        public List<Comic> GetComics()
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comic>("comic");

            MongoCursor<Comic> stripovi = collection.FindAll().SetSortOrder(SortBy.Descending("numberLikes"));

            List<Comic> comics = stripovi.ToList();
            return comics;
        }

        [HttpGet]
        [Route("GetComicsByNameLike/{nameLike}")]
        public List<Comic> GetComicsByNameLike(string nameLike)
        {
            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comic>("comic");

            var query = Query.Matches("name", nameLike);

            MongoCursor<Comic> stripovi = collection.Find(query).SetSortOrder(SortBy.Descending("numberLikes"));

            List <Comic> comics = stripovi.ToList();
            return comics;
        }

        [HttpGet]
        [Route("GetComicById/{idComic}")]
        public IHttpActionResult GetComicById(string idComic)
        {
            Comic comic = new Comic();

            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comic>("comic");

            var query = Query.EQ("_id", new ObjectId(idComic));
            comic = collection.Find(query).First();
            return Ok(comic);
        }

        [HttpPut]
        [Route("ComicNumberLikesInc/{idComic}")]
        public IHttpActionResult ComicNumberLikesInc(string idComic)
        {
            Comic comic = new Comic();

            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comic>("comic");

            var query = Query.EQ("_id", new ObjectId(idComic));
            comic = collection.FindOne(query);
            int nL = comic.numberLikes;

            var update = Update.Set("numberLikes", nL + 1);
            collection.Update(query, update);

            return Ok();
        }

        [HttpPut]
        [Route("ComicNumberLikesDec/{idComic}")]
        public IHttpActionResult ComicNumberLikesDec(string idComic)
        {
            Comic comic = new Comic();

            MongoClient client = new MongoClient("mongodb://localhost/?safe=true");
            MongoServer server = client.GetServer();
            var database = server.GetDatabase("comicclub");

            var collection = database.GetCollection<Comic>("comic");

            var query = Query.EQ("_id", new ObjectId(idComic));
            comic = collection.FindOne(query);
            int nL = comic.numberLikes;

            var update = Update.Set("numberLikes", nL - 1);
            collection.Update(query, update);

            return Ok();
        }
    }
}
