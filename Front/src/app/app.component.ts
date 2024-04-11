import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Upload System';

  filmSections = [
    { name: "Action", films:
      [
        { title: 'Dune II', year: 2021, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4gh9LSkVe1gr0Vteln1BjMIlJ07.jpg', isHovered: false },
        { title: 'Kung Fu Panda 4', year: 2024, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg', isHovered: false },
        { title: 'Oppenheimer', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/boAUuJBeID7VNp4L7LNMQs8mfQS.jpg', isHovered: false },
        { title: 'Fast & Furious X', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/piYNJlLvSlXYnXh6ZoKzhPdrMfV.jpg', isHovered: false },
        { title: 'Joker', year: 2019, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zDyT3gIeae39UgL9P6jL5Zc3zyt.jpg', isHovered: false },
        { title: 'Vice-Versa 2', year: 2024, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xaebmhp7LkB2udoE2JEN3eZHzqj.jpg', isHovered: false },
        { title: 'Avatar : La Voie de l\'eau', year: 2022, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ilp4BRPbMQ07fcUePhR8mDN8Kle.jpg', isHovered: false },
        { title: 'Super Mario Bros. le film', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ahMxyHMSJXingQr4yJBMzMU9k42.jpg', isHovered: false }
      ]
    },
    { name: "Romance", films:
      [
        { title: 'Pauvres créatures', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/roRjNH7cRVrZQYv1Ex8ownMu2ey.jpg', isHovered: false },
        { title: 'À contre-sens', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3ZCfSSxZ2e4Kiwu3Y9dvfT5n1m6.jpg', isHovered: false },
        { title: 'Élémentaire', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rzY5kUJJ1zGfingV2oHyyxtlGNa.jpg', isHovered: false },
        { title: 'La Belle et la Bête', year: 1991, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sIhRrRapijHVKOTfTp93YsP89e4.jpg', isHovered: false },
        { title: 'Forrest Gump', year: 1994, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/A0Th0x8QIzP0njrFAJnYQ5ouIoB.jpg', isHovered: false },
        { title: 'Your Name.', year: 2016, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zyHjvVRgKOt9wgVx4ikp2kGArGF.jpg', isHovered: false },
        { title: 'Ghosted', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tds2CSzH5tPAc9CbeUDRtSVzFhs.jpg', isHovered: false },
        { title: 'Avant toi', year: 2016, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uNpiKNBkY2RV1uyYpDle9LAU0VH.jpg', isHovered: false }
      ]
    },
    { name: "Science Fiction", films:
      [
        { title: 'The Marvels', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mqAQO6j5gkq6iwCXNbXpzf0RXBU.jpg', isHovered: false },
        { title: 'The Flash', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/azio74W2qw7bNg7ePqzkWywwK1n.jpg', isHovered: false },
        { title: 'Godzilla', year: 2014, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ArTbq30YnbzTjuJ1gNlx17C08si.jpg', isHovered: false },
        { title: 'Avengers : Infinity War', year: 2018, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/amopQYesMdw4wtMMUhsUtvMUyT6.jpg', isHovered: false },
        { title: 'Interstellar', year: 2014, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1pnigkWWy8W032o9TKDneBa3eVK.jpg', isHovered: false },
        { title: 'Spider-Man : Across the Spider-Verse', year: 2023, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hvfwCeSTgsExmz9l31dKkfR83DH.jpg', isHovered: false },
        { title: 'Tenet', year: 2020, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/72SOtZnFhCumLRZhoXlX8g2IkgF.jpg', isHovered: false },
        { title: 'Inception', year: 2010, image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg', isHovered: false }
      ]
    }
  ];

}
