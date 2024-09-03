project outline


# Goal
a project managment system designed for agencies over developer solutions
the majority of project managment softwares are either highly bloated with high price tags or are specifically designed for software engineering teams dealing with large amounts of tasks each with a small effect. agencies on the other hand dont need this since consulting based tasks are generally longer and are harder to categorize than just "issue".

* Task Managment System
  * Display tasks in a table
  * Display tasks in a kaban board
  * Assignees
    * Display task assignees
    * Add Assignee
    * Remove Assignee
  * Update Task Information
  * Filter Task based on following
    * Assignees
    * Due Date
    * Status
    * Priority
    * Text Search
* Tags
  * Add Task Tags
  * Remove Task Tags
  * Update Tag
  * Tag UI Icon
  * when user clicks on status, they can alter it
  * when user clicks on priority, they can alter it
  * be able to update table without pagination reseting. i.e if i alter a task in the overview, the table updates without doing a DOM refresh
  * update table with filters still being applied
  * add tags to each task
  * remove tags from task
  * when tag on task is clicked. it now adds a filter on the table for just displaying that tag
* when use badge is clicked it offers a drop down menu of 1. base specific tasks i.e contact this user. profile, manager etc but also has a section that can be made individual based on the usage
* create the three dots 