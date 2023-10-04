import React from 'react';
import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../App';

test('renders_App_with_Header_and_routing_links', () => {
  render(
      <App />
  );

  // Assert that the header title is present in the document
  const headerTitleElement = screen.getByTestId('app_title');
  expect(headerTitleElement).toBeInTheDocument();
  
  // Assert that the routing links are present in the document
  const homeLinkElement = screen.getByText(/Home/i);
  const addCollectionLinkElement = screen.getByText(/Add Collection/i);
  const displayCollectionLinkElement = screen.getByText(/Display Collection/i);
  
  expect(homeLinkElement).toBeInTheDocument();
  expect(addCollectionLinkElement).toBeInTheDocument();
  expect(displayCollectionLinkElement).toBeInTheDocument();
});

test('renders_Home_component_with_correct_title', () => {
  render(<App />);

  const home_link = screen.getByText(/Home/i);
  fireEvent.click(home_link);
  // Assert that the h2 title is present with the correct text
  const titleElement = screen.getByRole('heading', { level: 2, name: /Welcome to the Library Collection App/i });
  expect(titleElement).toBeInTheDocument();
});

test('renders_Home_component_with_correct_image', () => {
  render(<App />);

  const home_link = screen.getByText(/Home/i);
  fireEvent.click(home_link);
  // Assert that the image is present with the correct alt text and source
  const imageElement = screen.getByAltText(/Library_App_Background/i);
  expect(imageElement).toBeInTheDocument();
});

test('renders_Footer_component_correclty', () => {
  render(<App />);
  
  // Assert that the footer text is present with the correct content
  const footerElement = screen.getByTestId("app_footer");
  expect(footerElement).toBeInTheDocument();
});

test('renders_Footer_component_with_current_year', () => {
  render(<App />);
  
  // Assert that the footer text contains the current year dynamically
  const currentYear = new Date().getFullYear();
  const footerElement = screen.getByText(new RegExp(currentYear.toString()));
  expect(footerElement).toBeInTheDocument();
});

test('renders_AddCollection_component_title_correctly', () => {
  render(<App />);
  
  const AddCollectionLink =  screen.getByText(/Add Collection/i)
  fireEvent.click(AddCollectionLink); 

  const titleElement = screen.getByText(/Add a New Book/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders_input_fields_and_labels', () => {
  render(<App />);

  const AddCollectionLink =  screen.getByText(/Add Collection/i)
  fireEvent.click(AddCollectionLink); 
  
  const idInput = screen.getByLabelText(/ID:/i);
  const nameInput = screen.getByLabelText(/Name:/i);
  const authorInput = screen.getByLabelText(/Author:/i);
  const publishYearInput = screen.getByLabelText(/Publish Year:/i);
  const priceInput = screen.getByLabelText(/Price:/i);

  expect(idInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(authorInput).toBeInTheDocument();
  expect(publishYearInput).toBeInTheDocument();
  expect(priceInput).toBeInTheDocument();
});

test('displays_validation_errors_with_empty_input', async () => {
  render(<App />);
  
  const AddCollectionLink =  screen.getByText(/Add Collection/i)
  fireEvent.click(AddCollectionLink); 

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/ID is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Author is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Publish Year is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Price is required/i)).toBeInTheDocument();
  });
});

test('checks_submit_form_functionality', async () => {
  render(<App/>);

  const AddCollectionLink =  screen.getByText(/Add Collection/i)
  fireEvent.click(AddCollectionLink); 
  
  const idInput = screen.getByLabelText(/ID:/i);
  const nameInput = screen.getByLabelText(/Name:/i);
  const authorInput = screen.getByLabelText(/Author:/i);
  const publishYearInput = screen.getByLabelText(/Publish Year:/i);
  const priceInput = screen.getByLabelText(/Price:/i);
 
  fireEvent.change(idInput, { target: { value: '123' } });
  fireEvent.change(nameInput, { target: { value: 'Sample Book' } });
  fireEvent.change(authorInput, { target: { value: 'John Doe' } });
  fireEvent.change(publishYearInput, { target: { value: '2022' } });
  fireEvent.change(priceInput, { target: { value: '20' } });

  
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true });
      
        // Find the submit button and trigger the click event
  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);
      
        // Validate the fetch function call with a partial endpoint match
    expect(fetchMock).toHaveBeenCalledWith(
          expect.stringContaining('/addBook'),
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: expect.any(String),
          })
        );
      
      fetchMock.mockRestore();
});


test('renders_Display_Collection_component_title_correctly', () => {
  render(<App />);

  const DisplayCollectionLink = screen.getByText(/Display Collection/i)
  fireEvent.click(DisplayCollectionLink)
  
  const titleElement = screen.getByText(/Book List/i);
  expect(titleElement).toBeInTheDocument();
});

test('fetches_data_from_the_backend_when_the_component_mounts', async () => {
  const mockData = [
    {
      id: 1,
      name: 'Sample Book 1',
      author: 'Author 1',
      publishYear: 2022,
      price: 25,
    },
    {
      id: 2,
      name: 'Sample Book 2',
      author: 'Author 2',
      publishYear: 2023,
      price: 30,
    },
  ];

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockData),
    ok: true,
  });

  render(<App />);

  const DisplayCollectionLink = screen.getByText(/Display Collection/i)
  fireEvent.click(DisplayCollectionLink)
  

  await waitFor(() => {
    expect(screen.getByText('Sample Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author: Author 1')).toBeInTheDocument();
    expect(screen.getByText('Publish Year: 2022')).toBeInTheDocument();
    expect(screen.getByText('Price: $25')).toBeInTheDocument();

    expect(screen.getByText('Sample Book 2')).toBeInTheDocument();
    expect(screen.getByText('Author: Author 2')).toBeInTheDocument();
    expect(screen.getByText('Publish Year: 2023')).toBeInTheDocument();
    expect(screen.getByText('Price: $30')).toBeInTheDocument();
  });

  expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/getAllBook'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  
});





