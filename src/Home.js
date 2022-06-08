import { useState, useEffect } from "react";

import Score from "./Score";

import Rank from "./StyledComponents/Rank.js";
import NameBox from "./StyledComponents/NameBox.js";
import Pic from "./StyledComponents/Pic.js";
import Item from "./StyledComponents/Item.js";

async function fetchData(setData) {
  const res = await fetch("https://webcdn.17app.co/campaign/pretest/data.json");
  const data = await res.json();
  setData(data);
}

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(setData);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setData((data) => {
        const newdata = data.map((item) => {
          const prevScore = item.score;
          item.score = item.score + getRandomIntInclusive(1, 1000);
          return {
            ...item,
            prevScore: prevScore
          };
        });
        newdata
          .sort((a, b) => b.score - a.score)
          .map((item, index) => {
            return {
              ...item,
              rank: index + 1
            };
          });
        return newdata;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="app">
      {data.map((dataItem, index) => {
        let rank = index + 1;
        let prevScore = dataItem.prevScore
          ? dataItem.prevScore
          : dataItem.score;

        return (
          <Item
            style={{
              transform: `translateY(${(rank - 1) * 40}px)`
            }}
            key={dataItem.userID}
            id={dataItem.userID}
          >
            <Rank>{rank}</Rank>
            <Pic
              style={{
                backgroundImage: `url(${dataItem.picture})`
              }}
            />
            <NameBox>{dataItem.displayName}</NameBox>
            <Score prevScore={prevScore} score={dataItem.score} />
          </Item>
        );
      })}
    </div>
  );
};

export default Home;
