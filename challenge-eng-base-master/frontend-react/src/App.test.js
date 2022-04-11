import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App';

const shawshankRedemptionLabel = 'movieResult-318'
const theGreatestStoryEverToldLabel = 'movieResult-4189'
const worldsGreatestDadLabel = 'movieResult-71429'

test('search box accepts input', async () => {
    const { getByLabelText } = render(<App />);
    userEvent.clear(getByLabelText('searchInputField'))
    userEvent.type(getByLabelText('searchInputField'), 'test');
    expect(searchInputField).toHaveValue('test');
})

test('searching by title', async () => {
    const { getByLabelText } = render(<App />);
    userEvent.clear(getByLabelText('searchInputField'))
    userEvent.type(getByLabelText('searchInputField'), 'test');
    userEvent.tab()
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(getByLabelText(shawshankRedemptionLabel)).toBeTruthy()
})

test('sorting results', async () => {
    const { getByLabelText } = render(<App />);
    userEvent.clear(getByLabelText('searchInputField'))
    userEvent.type(getByLabelText('searchInputField'), 'test');
    userEvent.tab()
    await new Promise(resolve => setTimeout(resolve, 1000));
    userEvent.selectOptions(getByLabelText('sortOrderInput'), 'asc');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(getByLabelText(theGreatestStoryEverToldLabel)).toBeTruthy()
})


test('filter by genre', async () => {
    const { getByLabelText, getByText, getAllByLabelText } = render(<App />);
    userEvent.clear(getByLabelText('searchInputField'))
    userEvent.type(getByLabelText('searchInputField'), 'test');
    userEvent.tab()
    await new Promise(resolve => setTimeout(resolve, 1000));
    userEvent.selectOptions(getByLabelText('sortOrderInput'), 'asc');
    await new Promise(resolve => setTimeout(resolve, 1000));
    userEvent.click(getAllByLabelText('filterGenreDrama')[0].closest('a'))
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(getByLabelText(worldsGreatestDadLabel)).toBeTruthy()
})

test('cancel filter by genre', async () => {
    const { getByLabelText, queryByLabelText, getAllByLabelText } = render(<App />);
    userEvent.clear(getByLabelText('searchInputField'))
    userEvent.type(getByLabelText('searchInputField'), 'test');
    userEvent.tab()
    await new Promise(resolve => setTimeout(resolve, 1000));
    userEvent.selectOptions(getByLabelText('sortOrderInput'), 'asc');
    await new Promise(resolve => setTimeout(resolve, 1000));
    userEvent.click(getAllByLabelText('filterGenreDrama')[0].closest('a'))
    await new Promise(resolve => setTimeout(resolve, 1000));
    userEvent.click(getAllByLabelText('clearGenreFilter')[0])
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(queryByLabelText(worldsGreatestDadLabel)).not.toBeInTheDocument()
})

test('searching invalid title renders no results', async () => {
    const { getByLabelText, queryByLabelText } = render(<App />);
    userEvent.clear(getByLabelText('searchInputField'))
    userEvent.type(getByLabelText('searchInputField'), 'invalid');
    userEvent.tab()
    await new Promise(resolve => setTimeout(resolve, 1000));
    const movieListings = queryByLabelText('movieListing')
    expect(movieListings).not.toBeInTheDocument()
})

