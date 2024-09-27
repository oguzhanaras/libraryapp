Library Project

This is a library project developed using HTML, CSS, and React for the frontend, with an existing backend ready to use. On the homepage, users are greeted with an overview, including statistics from other components and a random book mention.

The project was built with Vite.

Live Link: [Library App](https://libraryapp-reactt.netlify.app)
Packages Used

    axios
    react-router

Components

Notification Component

A component created to display appropriate notifications to users during CRUD operations.
Books Component

This component includes a book search input and a form for adding new books. In the form, fields like author, publisher, and category are selectable, while other fields are user inputs. If the publication year or stock is not greater than zero, the addition is prevented, and an error message is shown to the user. Added books are listed next to the form. You can click on a book to view its details.

Book => Detail
On the detail page, book information is displayed, and users have the option to edit or delete the book. If deleted, a success message is shown, and the user is redirected to the books page. Clicking the edit button takes the user to the edit page.

Book => Edit
On the edit page, existing book information is loaded into the form, allowing users to make desired changes and update the book. After the update, a success or error message is shown. The update process can be canceled with the cancel button.
Borrows Component

This component includes a form for borrowing books, allowing users to complete the rental process by filling in the required information. Borrowed books are listed below the form, and users can click to view book details or edit the borrowing. Notifications are provided for all operations.

Borrows => Detail
The detail page shows borrowing information. Users can update or delete the borrowing details, and they are notified with the notification component.

Borrows => Edit
On the update page, users can edit the form details and make desired changes. Feedback is provided using the notification component.
Publishers Component

On the publishers page, there is a form for adding a new publisher. The status of the addition (success or error) is displayed to the user using the notification component, and the newly added publisher is listed below the form. Users can click on a publisher to view its details.

Publishers => Detail
The detail page displays publisher information, allowing users to edit or delete the publisher.

Publishers => Edit
On the edit page, users can update the publisher by modifying the form. After the update, feedback and guidance are provided.
Categories Component

This component includes a form for adding new categories, with existing categories displayed below. Users can click on a category to view its details.

Categories => Detail
The detail page shows the category details, and users can use the update or delete buttons to manage the category.

Categories => Edit
On the update page, users can edit the category information using the form, with notifications provided to inform users of the outcome.
Authors Component

A form is provided to add new authors, and existing authors are displayed below. Users can click on an author to view the details page.

Authors => Detail
Author details are displayed to the user. The user can delete the author or navigate to the update page using the respective buttons.

Authors => Edit
A form is available to update the author. During the update process, feedback is provided to the user.