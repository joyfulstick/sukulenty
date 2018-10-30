import Downshift, { resetIdCounter } from 'downshift'
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'
import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import Router from 'next/router'
import debounce from 'lodash.debounce'
import gql from 'graphql-tag'

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!, $searchTermCap: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { title_contains: $searchTermCap } # PostgreSQL case insensitive
          { description_contains: $searchTerm }
          { description_contains: $searchTermCap } # PostgreSQL case insensitive
        ]
      }
    ) {
      id
      image
      title
    }
  }
`

function routeToItem(item) {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  })
}

class Search extends Component {
  state = {
    items: [],
    loading: false,
  }
  onChange = debounce(async (e, client) => {
    this.setState({ loading: true })
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: {
        searchTerm: e.target.value,
        searchTermCap: e.target.value.replace(/\b\w/g, l => l.toUpperCase()),
      },
    })
    this.setState({
      items: res.data.items,
      loading: false,
    })
  }, 350)
  render() {
    resetIdCounter()
    const { state, onChange } = this
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToItem}
          itemToString={item => (item === null ? '' : item.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Szukaj...',
                      id: 'search',
                      className: state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist()
                        onChange(e, client)
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {state.items.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!state.items.length &&
                    !state.loading && (
                      <DropDownItem>
                        {' '}
                        Nie znaleziono {inputValue} 😞
                      </DropDownItem>
                    )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    )
  }
}

export default Search
