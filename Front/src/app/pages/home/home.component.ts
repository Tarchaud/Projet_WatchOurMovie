import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  filmSections = [
    { name: "Action", films:
      [
        { title: 'Dune II', year: 2021, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4gh9LSkVe1gr0Vteln1BjMIlJ07.jpg' },
        { title: 'Kung Fu Panda 4', year: 2024, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg' },
        { title: 'Oppenheimer', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/boAUuJBeID7VNp4L7LNMQs8mfQS.jpg' },
        { title: 'Fast & Furious X', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/piYNJlLvSlXYnXh6ZoKzhPdrMfV.jpg' },
        { title: 'Joker', year: 2019, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zDyT3gIeae39UgL9P6jL5Zc3zyt.jpg' },
        { title: 'Vice-Versa 2', year: 2024, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xaebmhp7LkB2udoE2JEN3eZHzqj.jpg' },
        { title: 'Avatar : La Voie de l\'eau', year: 2022, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ilp4BRPbMQ07fcUePhR8mDN8Kle.jpg' },
        { title: 'Super Mario Bros. le film', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ahMxyHMSJXingQr4yJBMzMU9k42.jpg' }
      ]
    },
    { name: "Romance", films:
      [
        { title: 'Pauvres créatures', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/roRjNH7cRVrZQYv1Ex8ownMu2ey.jpg' },
        { title: 'À contre-sens', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3ZCfSSxZ2e4Kiwu3Y9dvfT5n1m6.jpg' },
        { title: 'Élémentaire', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rzY5kUJJ1zGfingV2oHyyxtlGNa.jpg' },
        { title: 'La Belle et la Bête', year: 1991, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sIhRrRapijHVKOTfTp93YsP89e4.jpg' },
        { title: 'Forrest Gump', year: 1994, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/A0Th0x8QIzP0njrFAJnYQ5ouIoB.jpg' },
        { title: 'Your Name.', year: 2016, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zyHjvVRgKOt9wgVx4ikp2kGArGF.jpg' },
        { title: 'Ghosted', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tds2CSzH5tPAc9CbeUDRtSVzFhs.jpg' },
        { title: 'Avant toi', year: 2016, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uNpiKNBkY2RV1uyYpDle9LAU0VH.jpg' }
      ]
    },
    { name: "Science Fiction", films:
      [
        { title: 'The Marvels', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mqAQO6j5gkq6iwCXNbXpzf0RXBU.jpg' },
        { title: 'The Flash', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/azio74W2qw7bNg7ePqzkWywwK1n.jpg' },
        { title: 'Godzilla', year: 2014, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ArTbq30YnbzTjuJ1gNlx17C08si.jpg' },
        { title: 'Avengers : Infinity War', year: 2018, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/amopQYesMdw4wtMMUhsUtvMUyT6.jpg' },
        { title: 'Interstellar', year: 2014, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1pnigkWWy8W032o9TKDneBa3eVK.jpg' },
        { title: 'Spider-Man : Across the Spider-Verse', year: 2023, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hvfwCeSTgsExmz9l31dKkfR83DH.jpg' },
        { title: 'Tenet', year: 2020, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/72SOtZnFhCumLRZhoXlX8g2IkgF.jpg' },
        { title: 'Inception', year: 2010, imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg' }
      ]
    }
  ];
}
