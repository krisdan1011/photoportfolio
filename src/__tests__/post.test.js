import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Post from '../components/Post/Post';
import stateStore from '../StateStore/store';

const post = {
    id: 887,
    featured_media: 142,
    categories: [220]
};

const tagNames = ['tag1', 'tag2', 'tag3'];

const href = 'https://fooimage';

jest.mock('../utils/Api', () => ({
    getPost: () => Promise.resolve(post),
    getTagNames: () => Promise.resolve(tagNames),
    getPostImage: () => Promise.resolve(href)
}));

test('Post displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter initialEntries={['/page/150']} >
          <Post stateStore={store}></Post>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
