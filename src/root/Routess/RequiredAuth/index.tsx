import React, { useEffect, Component } from 'react'
import { connect } from 'react-redux'
import { changeRoute } from 'store/actions/login'

export default function(ComposedComponent: React.FC) {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!localStorage.getItem('loggedUser')){
        //this.props.history.push('/signIn')
        window.location.href='/signIn';
      }
    }
    componentWillUpdate(nextProps) {
      if (!localStorage.getItem('loggedUser')){
        window.location.href='/signIn';
      }
    }
    render() {
      if (!localStorage.getItem('loggedUser')) {
        return <></>
      }
      return <ComposedComponent {...this.props} />
    }
  }
  const mapStateToProps = (state: any) => ({

  })
  const mapDispatchToProps = { changeRoute }

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth)
}
