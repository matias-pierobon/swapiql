import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Link from 'next/link'
import { Fragment } from 'react'
import QueryPage from '../components/QueryPage'
import List from '../components/EntityList/EntityList'
import Item from '../components/EntityList/EntityItem'
import SearchBox from '../components/SearchBox'
import withData from '../lib/withData'

const query = `query allVehicles {
  vehicles {
    id
    name
  }
}
`
const vehiclesQuery = gql(query)

export default withData(() => (
  <QueryPage query={query}>
    <Query query={vehiclesQuery}>
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return 'Error'
        return (
          <Fragment>
            <SearchBox />
            <List>
              {data.vehicles.map(vehicle => (
                <Link prefetch href={`/vehicle?id=${vehicle.id}`} key={vehicle.id}>
                <a>
                  <Item content={vehicle.name} />
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
