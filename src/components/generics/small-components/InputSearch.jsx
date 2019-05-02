import React from 'react'
import classnames from 'classnames'

export default props =>
    <label className={classnames("search-form-ibdu--searchInput", props.label)}>
        <input
            className={props.inputSearchClass}
            value={props.valor}
            onChange={(e) => {props.onChange(e); props.handleActive(true)}}
            type="search"
            placeholder="Pesquise"
            aria-label="Search"
        />
        <button className='search-form-ibdu--searchButton btn' onClick={() => {props.handleSearchFromBtn(); props.handleActive(false)}}>

        </button>
    </label>
