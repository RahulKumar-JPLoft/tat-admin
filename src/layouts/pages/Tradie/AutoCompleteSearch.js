import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

let addrees = "";
const AutoCompleteSearch = ({ state, setStateFunction }) => {
  const [searchQuery, setSeacrhQuery] = useState("");

  const handleChange = (value) => {
    setSeacrhQuery(value);
  };
  const handleSelect = (searchQuery) => {
    setSeacrhQuery(searchQuery);

    geocodeByAddress(searchQuery)
      .then((results) => {
        addrees = results[0].formatted_address;

        return getLatLng(results[0]);
      })
      .then((latLng) => {
        setStateFunction({
          ...state,
          latitude: latLng.lat,
          longitude: latLng.lng,
          locationAdress: addrees,
        });
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <div className="section-top__autoCompleteSearch" style={{ zIndex: 3 }}>
      <PlacesAutocomplete
        value={searchQuery}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Address",
                className: "location-search-input",
              })}
              className="section-top__autocomplete-search-input"
            />
            <div className="autocomplete-dropdown-container">
              <div className="section-top__autocomplete-search-dropDown">
                {suggestions.map((suggestion, idx) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#ffffff", cursor: "pointer" }
                    : {
                        backgroundColor: "#ffffff",
                        cursor: "pointer",
                      };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={idx}
                    >
                      <div
                        style={{ display: "flex", alignItems: "center" }}
                        className="section-top__svg-and-location"
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          // style,
                        })}
                      >
                        <p
                          className="section-top__autocomplete-search-items"
                          // onClick={(evt) => handleSelectTerm(suggestion.description)}
                        >
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};
export default AutoCompleteSearch;
