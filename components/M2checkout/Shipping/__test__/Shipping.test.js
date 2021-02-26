import React from 'react'
import { render, fireEvent, cleanup, waitFor, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { Shipping } from '../index'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'mutationobserver-shim'
import { m2Reducer } from '../../../../store/reducers/m2Reducer'
import { act } from 'react-dom/test-utils'

afterEach(cleanup)

const initState = { m2: m2Reducer(undefined, {}) }

function renderWithRedux(
  component,
  { initialState = initState, store = createStore(m2Reducer, initialState), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return render(component, { wrapper: Wrapper, ...renderOptions })
}

describe('Shipping Data', () => {
  it('renders properly', () => {
    const wrapper = renderWithRedux(<Shipping />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('changes toggle', () => {
    const { getByRole, getByTestId, getByText, container } = renderWithRedux(<Shipping />)
    expect(getByRole('checkbox')).toHaveProperty('checked', true)
    getByRole('checkbox').click()
    fireEvent.change(getByRole('checkbox'), { target: { checked: false } })
    expect(getByRole('checkbox')).toHaveProperty('checked', false)
  })

  describe('valid inputs', () => {
    it('does not render validation errors', async () => {
      const { container } = renderWithRedux(<Shipping />)

      await act(async () => {
        const firstName = container.querySelector('input[name="firstname"]')
        fireEvent.change(firstName, { target: { value: 'John' } })
        fireEvent.blur(firstName)
        const lastName = container.querySelector('input[name="lastname"]')
        fireEvent.change(lastName, { target: { value: 'Doe' } })
        fireEvent.blur(lastName)
        const telephone = container.querySelector('input[name="telephone"]')
        fireEvent.change(telephone, { target: { value: '11234456456' } })
        fireEvent.blur(telephone)
        const street = container.querySelector('input[name="street"]')
        fireEvent.change(street, { target: { value: 'Calle' } })
        fireEvent.blur(street)
        const number = container.querySelector('input[name="number"]')
        fireEvent.change(number, { target: { value: '123' } })
        fireEvent.blur(number)
        const postcode = container.querySelector('input[name="postcode"]')
        fireEvent.change(postcode, { target: { value: '3999' } })
        fireEvent.blur(postcode)
      })

      expect(container.innerHTML.includes('class="InputForm__Error')).toBe(false)
    })
  })

  describe('invalid firstname', () => {
    it('does render validation errors', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const firstName = container.querySelector('input[name="firstname"]')
      await act(async () => {
        fireEvent.change(firstName, { target: { value: '' } })
        fireEvent.blur(firstName)
      })
      expect(container.innerHTML).toMatch('Campo Requerido')

      await act(async () => {
        fireEvent.change(firstName, { target: { value: 'Prueba123' } })
        fireEvent.blur(firstName)
      })
      expect(container.innerHTML).toMatch('El campo solo debe contener letras')
    })

    it('does render validation errors', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const firstName = container.querySelector('input[name="firstname"]')
      await act(async () => {
        fireEvent.change(firstName, { target: { value: 'aaaaaaaaaaaaaaaaaaaaa' } })
        fireEvent.blur(firstName)
      })
      expect(container.innerHTML).toMatch('El campo no debe tener mas de')
    })
  })

  describe('invalid lastname', () => {
    it('does render validation errors', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const lastname = container.querySelector('input[name="lastname"]')
      await act(async () => {
        fireEvent.change(lastname, { target: { value: '' } })
        fireEvent.blur(lastname)
      })
      expect(container.innerHTML).toMatch('Campo Requerido')

      await act(async () => {
        fireEvent.change(lastname, { target: { value: 'Prueba123' } })
        fireEvent.blur(lastname)
      })
      expect(container.innerHTML).toMatch('El campo solo debe contener letras')
    })

    it('does render validation errors', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const lastname = container.querySelector('input[name="lastname"]')
      await act(async () => {
        fireEvent.change(lastname, { target: { value: 'aaaaaaaaaaaaaaaaaaaaa' } })
        fireEvent.blur(lastname)
      })
      expect(container.innerHTML).toMatch('El campo no debe tener mas de')
    })
  })

  describe('invalid telephone', () => {
    it('does render validation errors', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const telephone = container.querySelector('input[name="telephone"]')

      await act(async () => {
        fireEvent.change(telephone, { target: { value: '' } })
        fireEvent.blur(telephone)
      })
      expect(container.innerHTML).toMatch('Campo Requerido')

      await act(async () => {
        fireEvent.change(telephone, { target: { value: '123' } })
        fireEvent.blur(telephone)
      })
      expect(container.innerHTML).toMatch('El campo debe tener mas de')
    })

    it('does render validation errors 2', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const telephone = container.querySelector('input[name="telephone"]')

      await act(async () => {
        fireEvent.change(telephone, { target: { value: 'asdadasdas' } })
        fireEvent.blur(telephone)
      })
      expect(container.innerHTML).toMatch('El campo solo debe')

      await act(async () => {
        fireEvent.change(telephone, { target: { value: '1231231231233' } })
        fireEvent.blur(telephone)
      })
      expect(container.innerHTML).toMatch('El campo no debe tener mas de')
    })
  })

  describe('invalid street', () => {
    it('does render validation errors', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const street = container.querySelector('input[name="street"]')
      await act(async () => {
        fireEvent.change(street, { target: { value: '' } })
        fireEvent.blur(street)
      })
      expect(container.innerHTML).toMatch('Campo Requerido')

      await act(async () => {
        fireEvent.change(street, { target: { value: 'Prueba123' } })
        fireEvent.blur(street)
      })
      expect(container.innerHTML).toMatch('El campo solo debe contener letras')
    })

    it('does render validation errors 2', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const street = container.querySelector('input[name="street"]')
      await act(async () => {
        fireEvent.change(street, { target: { value: 'aaaaaaaaaaaaaaaaaaaaa' } })
        fireEvent.blur(street)
      })

      expect(container.innerHTML).toMatch('El campo no debe tener mas de')
    })
  })

  describe('invalid number', () => {
    it('does render validation errors', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const number = container.querySelector('input[name="number"]')
      await act(async () => {
        fireEvent.change(number, { target: { value: '' } })
        fireEvent.blur(number)
      })
      expect(container.innerHTML).toMatch('Campo Requerido')

      await act(async () => {
        fireEvent.change(number, { target: { value: 'P123' } })
        fireEvent.blur(number)
      })
      expect(container.innerHTML).toMatch('El campo solo debe contener números')
    })

    it('does render validation errors 2', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const number = container.querySelector('input[name="number"]')
      await act(async () => {
        fireEvent.change(number, { target: { value: '123456' } })
        fireEvent.blur(number)
      })

      expect(container.innerHTML).toMatch('El campo no debe tener mas de')
    })
  })

  describe('invalid postcode', () => {
    it('does render validation errors', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const postcode = container.querySelector('input[name="postcode"]')
      await act(async () => {
        fireEvent.change(postcode, { target: { value: '' } })
        fireEvent.blur(postcode)
      })
      expect(container.innerHTML).toMatch('Campo Requerido')

      await act(async () => {
        fireEvent.change(postcode, { target: { value: 'P123' } })
        fireEvent.blur(postcode)
      })
      expect(container.innerHTML).toMatch('El campo solo debe contener números')
    })

    it('does render validation errors 2', async () => {
      const { container } = renderWithRedux(<Shipping />)
      const postcode = container.querySelector('input[name="postcode"]')
      await act(async () => {
        fireEvent.change(postcode, { target: { value: '123456' } })
        fireEvent.blur(postcode)
      })

      expect(container.innerHTML).toMatch('El campo no debe tener mas de')

      await act(async () => {
        fireEvent.change(postcode, { target: { value: '1' } })
        fireEvent.blur(postcode)
      })

      expect(container.innerHTML).toMatch('El campo debe tener mas de')
    })
  })
})
