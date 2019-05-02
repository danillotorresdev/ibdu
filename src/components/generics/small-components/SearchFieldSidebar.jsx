import React from 'react'
import InputSearch from '../small-components/InputSearch'
import classnames from 'classnames'

export default props =>
    <div className={classnames("searchField w-100", props.searchFieldSidebarClass)}>
        <InputSearch
            label='w-100'
            inputSearchClass="search-form-ibdu--input-search search-form-ibdu--input-search__blueBorder form-control align-middle"
        />
    </div>