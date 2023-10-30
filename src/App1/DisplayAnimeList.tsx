import {AnimeList} from './SearchAnime';

import './css/SearchAnime.css';

type Props = {
  data:AnimeList
}

function DisplayAnimeList(props:Props){
  const {data} = props.data;
  
  return (
    <>
      {data.length === 0 
        ?
          <p>キーワードに該当するアニメは存在しません</p>
        :
          <div className="display-list">
          {data.map(item => {
            return (
              <div key={item.mal_id} className="anime-item" onClick={() => window.open(item.url)}>
                <div className="anime-img"><img alt='アニメの画像' src={item.images.jpg.image_url}/></div>
                <div className="anime-item-text">
                  <div className="anime-container">
                    <p>{item.year ? item.year : '---'}</p>
                    <p>{item.type}</p>
                  </div>
                  <h2 className="anime-title">{item.title_japanese}</h2>
                </div>
              </div>
            )
          })}
          </div>
      }
    </>
  )
}

export default DisplayAnimeList;