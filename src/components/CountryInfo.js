import React from 'react'; // React 라이브러리에서 React를 임포트합니다.

function CountryInfo({ countryData }) { // CountryInfo 컴포넌트 정의 시작, countryData를 props로 받습니다.
    return ( 
        <div> 
            <img src={countryData.flags.svg} alt="Flag" className="flagImage" /> 
            {/* 국가의 깃발 이미지를 표시합니다. */}
            <h2>{countryData.name.common}</h2> 
            {/* 국가의 일반적인 이름을 표시합니다. */}
            <div className="row"> 
                <div className="dataRow"> 
                    <h4>수도:</h4> 
                    {/* '수도' 라벨을 표시합니다. */}
                    <span>{countryData.capital[0]}</span> 
                    {/* 국가의 수도를 표시합니다. */}
                </div> 
            </div> 
            <div className="row"> 
                <div className="dataRow"> 
                    <h4>대륙정보:</h4> 
                    {/* '대륙정보' 라벨을 표시합니다. */}
                    <span>{countryData.continents[0]}</span> 
                    {/* 국가가 속한 대륙을 표시합니다. */}
                </div> 
            </div> 
            <div className="row"> 
                <div className="dataRow"> 
                    <h4>인구수:</h4> 
                    {/* '인구수' 라벨을 표시합니다. */}
                    <span>{countryData.population}</span> 
                    {/* 국가의 인구수를 표시합니다. */}
                </div> 
            </div> 
            <div className="row"> 
                <div className="dataRow"> 
                    <h4>화폐정보:</h4> 
                    {/* '화폐정보' 라벨을 표시합니다. */}
                    <span> 
                        {countryData.currencies[ 
                            Object.keys(countryData.currencies)[0] 
                        ].name}{' '} 
                        {/* 국가의 주 화폐 이름을 표시합니다. */}
                        - {Object.keys(countryData.currencies)[0]} 
                        {/* 국가의 주 화폐 코드(예: USD)를 표시합니다. */}
                    </span> 
                </div> 
            </div> 
            <div className="row"> 
                <div className="dataRow"> 
                    <h4>주언어:</h4> 
                    {/* '주언어' 라벨을 표시합니다. */}
                    <span> 
                        {Object.values(countryData.languages) 
                            .toString() 
                            .split(',') 
                            .join(', ')} 
                        {/* 국가에서 사용되는 언어들을 표시합니다. */}
                    </span> 
                </div> 
            </div> 
            <div className="row"> 
                <div className="dataRow"> 
                    <h4>국경:</h4> 
                    {/* '국경' 라벨을 표시합니다. */}
                    <span> 
                        {(countryData.borders) ? Object.values(countryData.borders) 
                            .toString() 
                            .split(',') 
                            .join(', ') : "NAN"} 
                        {/* 국가와 국경을 접하고 있는 국가들을 표시합니다. 국경이 없으면 "NAN"을 표시합니다. */}
                    </span> 
                </div> 
            </div> 
            <div className="row"> 
                <div className="dataRow"> 
                    <h4>시간대:</h4> 
                    {/* '시간대' 라벨을 표시합니다. */}
                    <span> 
                        {Object.values(countryData.timezones) 
                            .toString() 
                            .split(',') 
                            .join(', ')} 
                        {/* 국가가 속한 시간대를 표시합니다. */}
                    </span> 
                </div> 
            </div> 
        </div> 
    ); 
} 

export default CountryInfo; // CountryInfo 컴포넌트를 내보냅니다.
