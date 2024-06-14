import React, { useState, useEffect } from 'react';
import './CountryInformation.css';
import CountryInfo from './CountryInfo';

function CountryInformation() {
    // 상태 변수 선언
    const [countryName, setCountryName] = useState(''); // 입력된 나라 이름
    const [countryData, setCountryData] = useState(null); // 검색된 나라 정보
    const [error, setError] = useState(''); // 에러 메시지
    const [suggestions, setSuggestions] = useState([]); // 자동완성 제안 목록

    // 검색 버튼 클릭 핸들러
    const handleSearch = () => {
        if (!countryName) {
            setError('The input field cannot be empty'); // 입력 필드가 비어 있을 경우 에러 메시지 설정
            setCountryData(null);
            return;
        }

        const finalURL = `https://restcountries.com/v3.1/name/${countryName.trim()}?fullText=true`; // API 요청 URL
        fetch(finalURL)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Not Found") {
                    setError("국가정보를 찾을 수 없습니다."); // 나라 정보를 찾지 못한 경우 에러 메시지 설정
                    setCountryData(null);
                } else if (data.length === 0) {
                    setError('국가 이름을 다시 검색해주세요'); // 유효하지 않은 나라 이름일 경우 에러 메시지 설정
                    setCountryData(null);
                } else {
                    setError(''); // 에러 메시지 초기화
                    setCountryData(data[0]); // 나라 정보 설정
                }
            })
            .catch(() => {
                setError('An error occurred while fetching data.'); // 데이터 가져오는 도중 에러 발생 시 에러 메시지 설정
                setCountryData(null);
            });
    };

    // 입력된 나라 이름이 변경될 때마다 실행
    useEffect(() => {
        if (countryName) {
            const suggestURL = `https://restcountries.com/v3.1/name/${countryName.trim()}`; // 자동완성 API 요청 URL
            fetch(suggestURL)
                .then((response) => response.json())
                .then((data) => {
                    if (data.message !== "Not Found" && data.length > 0) {
                        setSuggestions(data.map(country => country.name.common)); // 자동완성 제안 목록 설정
                    } else {
                        setSuggestions([]); // 제안된 나라가 없을 경우 빈 배열로 설정
                    }
                })
                .catch(() => setSuggestions([])); // 에러 발생 시 빈 배열로 설정
        } else {
            setSuggestions([]); // 나라 이름이 비어 있을 경우 빈 배열로 설정
        }
    }, [countryName]); // countryName 상태가 변경될 때마다 useEffect 실행

    // 자동완성 제안 클릭 핸들러
    const handleSuggestionClick = (suggestion) => {
        setCountryName(suggestion); // 선택된 제안으로 나라 이름 설정
        setSuggestions([]); // 자동완성 제안 목록 초기화
    };

    // 입력 필드 포커스 해제 시 자동완성 제안 목록 초기화
    const handleBlur = () => {
        setSuggestions([]);
    };

    return (
        <div className="container">
            <div className="search">
                <input
                    type="text"
                    id="countryName"
                    placeholder="여기에 나라를 입력하세요"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)} // 입력 필드 변경 핸들러
                    onBlur={handleBlur} // 포커스 해제 핸들러
                    onFocus={() => {
                        if (countryName) {
                            const suggestURL = `https://restcountries.com/v3.1/name/${countryName.trim()}`; // 자동완성 API 요청 URL
                            fetch(suggestURL)
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data.message !== "Not Found" && data.length > 0) {
                                        setSuggestions(data.map(country => country.name.common)); // 자동완성 제안 목록 설정
                                    } else {
                                        setSuggestions([]); // 제안된 나라가 없을 경우 빈 배열로 설정
                                    }
                                })
                                .catch(() => setSuggestions([])); // 에러 발생 시 빈 배열로 설정
                        }
                    }}
                />
                <button id="search-btn" onClick={handleSearch}>
                    검색하기
                </button>
                {suggestions.length > 0 && (
                    <div className="dropdown">
                        {suggestions.slice(0, 5).map((suggestion, index) => (
                            <div
                                key={index}
                                className="dropdown-item"
                                onMouseDown={() => handleSuggestionClick(suggestion)} // 제안 클릭 핸들러
                            >
                                {suggestion}
                            </div>
                        ))}
                        {suggestions.length > 5 && (
                            <div className="dropdown-scroll">
                                {suggestions.slice(5).map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="dropdown-item"
                                        onMouseDown={() => handleSuggestionClick(suggestion)} // 제안 클릭 핸들러
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div id="result">
                {error && <h3>{error}</h3>}  {/* 에러 메시지 표시 */}
                {countryData && (<CountryInfo countryData={countryData} />)} {/* 나라 정보 표시 */}
            </div>
        </div>
    );
}

export default CountryInformation;
