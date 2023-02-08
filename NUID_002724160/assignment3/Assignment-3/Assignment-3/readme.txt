Assignment 3:
    1.Table should not be expanded when page loads
        Modify the display of "dropDownTextArea" as none.

    2.Submit button to be disabled and grayed out and it should not be clickable
        Use disable attribute which id is "button". Also set backgroundColor as gray.

    3.Add New Student Button should add new student with dummy values and dummy values should be dynamically added e.g for row 4 the values will be Student 4, Teacher 4 etc. and for row 5 the values will be Student 5, Teacher 5 etc.
        Get innerHTML for index number from specify row and then create new row with index + 1 after the last row.
    
    4.For newly added rows make sure existing CSS are applied too.
        Put innerHTML same as original row.
    
    5.After successful add of the record display the pop-up message as Record added successfully (any user-friendly message is also fine) and display error message in case add of record addition failed.
        Use "confirm" to make sure if want to add or delete. And use "alert" as a reminder.
    
    6.On selecting any of the check-boxes,
        i] Background color to be changed for the particular row to “Yellow” and 
            Set specify row backgroundColor "yellow".
        ii] Submit button to turn orange. 
            Set submitButton turn orange while there is checkbox selected.
        iii]A delete button should get added dynamically in DELETE column and should delete the entire row when clicked. Also, pop-up message should be displayed by saying that Record deleted successfully.
            While checkbox selected, display delete button.
        iv) An Edit button should get added dynamically in EDIT COLUMN and should only display pop up box with message “Edit the details”. No need to display the field names
            Edit button display as delete button.
            
    7.Deselecting the check box will 
        a.make the row background color white again. 
            Set row backgroundColor "white" while cancel select checkbox.
        b.Also, if none of the rows are selected, the Submit button should be Grayed out again(disabled). (i.e., if 1 or more of the check-boxes are selected, the Submit button will be enabled and background color will be yellow. If none are selected, it will be disabled and background set to Gray)
            If count of checkbox selected as 0, submit button become gray and disable.
        c.DELETE button in those de-selected rows will be hidden
            Delete button only show when checkbox selected.
        d.EDIT button in those de-selected rows will be hidden
            Edit button only show when checkbox selected.

    8.Clicking on any of the green arrows will expand the particular row. Clicking it again will collapse it (i.e., toggle view on click)
            Set img event, when click the img, dynamically add tr next to specify row.