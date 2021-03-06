import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Link from 'next/link'
import { Fragment } from 'react'
import QueryPage from '../components/QueryPage'
import List from '../components/EntityList/EntityList'
import Item from '../components/EntityList/EntityItem'
import SearchBox from '../components/SearchBox'
import withData from '../lib/withData'

const query = `query allPlanets {
  planets {
    id
    name
  }
}
`
const planetsQuery = gql(query)

export default withData(() => (
  <QueryPage query={query}>
    <Query query={planetsQuery}>
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return 'Error'
        return (
          <Fragment>
            <SearchBox />
            <List>
              {data.planets.map(planet => (
                <Link prefetch href={`/planet?id=${planet.id}`} key={planet.id}>
                  <a >
                    <Item content={planet.name} />
                  </a>
                </Link>
              ))}
            </List>
          </Fragment>
        )
      }}
    </Query>
  </QueryPage>
))
