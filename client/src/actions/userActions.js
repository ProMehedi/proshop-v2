import axios from 'axios'
import * as USER from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER.USER_LOGIN_REQUEST })

    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    const { data } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config
    )

    dispatch({ type: USER.USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER.USER_REGISTER_REQUEST })

    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    const { data } = await axios.post(
      '/api/v1/users',
      { name, email, password },
      config
    )

    dispatch({ type: USER.USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: USER.USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER.USER_LOGOUT })
}
