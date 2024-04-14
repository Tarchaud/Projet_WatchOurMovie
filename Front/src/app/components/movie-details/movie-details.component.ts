import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  film: any;

  ngOnInit() {
    this.film = {
    "adult": false,
    "backdrop_path": "/zbdoCe1meTyy0v1fsIxZ9Q0ef3H.jpg",
    "belongs_to_collection": {
        "id": 8650,
        "name": "Transformers - Saga",
        "poster_path": "/634HpDF95NXzfExXfmeDNPEwT3r.jpg",
        "backdrop_path": "/zvZBNNDWd5LcsIBpDhJyCB2MDT7.jpg"
    },
    "budget": 200000000,
    "genres": [
        {
            "id": 878,
            "name": "Science-Fiction"
        },
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Aventure"
        }
    ],
    "homepage": "http://www.transformersmovie.com",
    "id": 8373,
    "imdb_id": "tt1055369",
    "original_language": "en",
    "original_title": "Transformers: Revenge of the Fallen",
    "overview": "Si Sam a fait ce qu'il a pu pour tirer un trait sur le conflit qui a eu lieu à Mission City et revenir à ses préoccupations quotidiennes, la guerre entre les Autobots et les Decepticons, tout en étant classée secret défense, a entraîné plusieurs changements. Le secteur 7 a ainsi été dissout et son plus fidèle soldat, l'agent Simmons, a été révoqué sans ménagement. Résultat : une nouvelle agence, NEST, a été mise en place...",
    "popularity": 19.179,
    "poster_path": "/zY6BcEsry0mU8D7a3agFbIeH6NS.jpg",
    "production_companies": [
        {
            "id": 7,
            "logo_path": "/1kqoutvio9eDaQpp0l4gQoEF4Yf.png",
            "name": "DreamWorks Pictures",
            "origin_country": "US"
        },
        {
            "id": 4,
            "logo_path": "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
            "name": "Paramount",
            "origin_country": "US"
        },
        {
            "id": 435,
            "logo_path": "/AjzK0s2w1GtLfR4hqCjVSYi0Sr8.png",
            "name": "di Bonaventura Pictures",
            "origin_country": "US"
        },
        {
            "id": 38831,
            "logo_path": null,
            "name": "DeSanto/Murphy Productions",
            "origin_country": "US"
        },
        {
            "id": 38833,
            "logo_path": null,
            "name": "Ian Bryce Productions",
            "origin_country": ""
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2009-06-19",
    "revenue": 836300000,
    "runtime": 151,
    "spoken_languages": [
        {
            "english_name": "Spanish",
            "iso_639_1": "es",
            "name": "Español"
        },
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "La revanche est proche.",
    "title": "Transformers 2 : La Revanche",
    "video": false,
    "vote_average": 6.18,
    "vote_count": 8173
    }
  }
}
