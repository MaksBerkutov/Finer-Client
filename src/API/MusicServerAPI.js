import axios from 'axios'
import config from '@config/config'

/*
const response = await axios.get(`${config.serverUrl}/api/data`, {
				params: {
					authorizationCode: authorizationCode,
					redirectUrl: `${config.clientUrl}/auntification`,
				},
			})

      response.data
*/
export default class MusicServerAPI {
	static async GetAllSong(server_id) {
		const response = await axios.get(`${config.serverUrl}/api/get_all_song`, {
			params: {
				server_id: server_id,
			},
		})
		const { playlist, status } = response.data
		if (status === 0) return null //error
		return playlist
	}
	static async SetPlayItem(server_id, item) {
		const response = await axios.get(`${config.serverUrl}/api/set_play_item`, {
			params: {
				server_id: server_id,
				item: item,
			},
		})
		return response.data
		/*const {  status } = response.data
		if (status === 0) return null //error
		return*/
	}
	static async GetCurrentPlayed(server_id) {
		const response = await axios.get(
			`${config.serverUrl}/api/get_current_played`,
			{
				params: {
					server_id: server_id,
				},
			}
		)
		const { id, status } = response.data
		if (status === 0) return null //error
		return id
	}
	static async DeletePlayedItem(server_id, item) {
		const response = await axios.get(
			`${config.serverUrl}/api/delete_play_item`,
			{
				params: {
					server_id: server_id,
					item: item,
				},
			}
		)
		const { id, status } = response.data
		if (status === 0) return null //error
		return id
	}
	static async GetCurrentStatus(server_id) {
		const response = await axios.get(
			`${config.serverUrl}/api/get_current_status`,
			{
				params: {
					server_id: server_id,
				},
			}
		)
		const { played, status } = response.data
		if (status === 0) return null //error
		return played
	}
	static async ChangeMusicStatus(server_id, newStatus) {
		const response = await axios.get(
			`${config.serverUrl}/api/change_music_status`,
			{
				params: {
					server_id: server_id,
					newStatus: newStatus,
				},
			}
		)
		const { played, status } = response.data
		if (status === 0) return null //error
		return played
	}
	static async GoNextSong(server_id) {
		const response = await axios.get(`${config.serverUrl}/api/go_next_song`, {
			params: {
				server_id: server_id,
			},
		})
		return response.data
		/*const {  status } = response.data
		if (status === 0) return null //error
		return*/
	}
	static async GoPrevSong(server_id) {
		const response = await axios.get(`${config.serverUrl}/api/go_prev_song`, {
			params: {
				server_id: server_id,
			},
		})
		return response.data
		/*const {  status } = response.data
		if (status === 0) return null //error
		return*/
	}
}
