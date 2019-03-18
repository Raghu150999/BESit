import React, { Component } from 'react'
import Profile from './Profile/Profile';
import './Profile/styles.css'

export default class ProfileContainer extends Component {
	render() {
		return (
			<div className="profile">
				<Profile />
			</div>
		)
	}
}
