import React from "react";
import './content-page.css';

import ContentItem from "../utilities/content-item/content-item";

import img1 from '../../assets/music.jpg';

let playlist = [
    {
        id: 1,
        name: "Животные",
        img: img1
    },
    {
        id: 2,
        name: "Животные",
        img: ''
    },
    {
        id: 3,
        name: "Животные",
        img: ''
    },
    {
        id: 4,
        name: "Животные",
        img: ''
    },
    {
        id: 5,
        name: "Животные",
        img: ''
    }
];

const ContentPage = () => {
  return (
      <div>
          <div className={"contentItemCard"}>
              <span>Recently Played</span>
              <div className={"contICardList"}>
                  {
                      // playlist.map((song))
                  }
                  {/*<ContentItem props={} />*/}

              </div>
          </div>
      </div>
  )
}

export default ContentPage;