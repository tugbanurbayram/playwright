import { test, expect } from "@playwright/test";
import exp from "constants";


test.beforeEach(async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/project-6')
});

test("Test Case 01 - Todo-App Modal Verification", async ( { page }) => {
    await expect(page.locator('.panel-heading')).toBeVisible()
    await expect(page.locator('.panel-heading')).toHaveText('My Tasks')
    await expect(page.locator('#input-add')).toBeEnabled()
    await expect(page.locator('#add-btn')).toBeEnabled()
    await expect(page.locator('#search')).toBeEnabled()
    await expect(page.locator('.todo-item > p')).toBeEnabled()
})

test("Test Case 02 - Single Task Addition and Removal", async ( { page }) => {
    const newTodoInput = page.locator('#input-add')
    await newTodoInput.fill('Do Homework')
    
    const addButton = page.locator("#add-btn")
    await addButton.click()

    const ToDo = page.locator('.todo-item')
    await expect(ToDo).toHaveText('Do Homework')
    
    const countToDo = await page.locator('.todo-item').count()
    expect(countToDo).toBe(1)

    const doneButton = page.locator('[data-icon="circle-check"]')
    await doneButton.click()

    const clearBtn = page.locator('#clear')

    await expect(clearBtn).toBeEnabled()

    const removeButton = page.locator('[data-icon="trash-can"]')
    await removeButton.click()
    
    await expect(page.locator('.todo-item > p')).toHaveText('No tasks found!')
})

test("Test Case 03 - Multiple Task Operations", async ( { page }) => {

    const newTodoInput = page.locator('#input-add')
    const addButton = page.locator("#add-btn")

    const tasks = ['cleaning', 'laundry', 'fitness', 'walking', 'groceries']


    for (const task of tasks) {
        await newTodoInput.fill(task)
        await addButton.click()
    }

    await expect(page.locator('.todo-item')).toHaveText(['cleaning', 'laundry', 'fitness', 'walking', 'groceries'])

    const doneButton = page.locator('[data-icon="circle-check"]')

    for (let i= 0; i < tasks.length; i++) {
        await doneButton.nth(i).click()
    }

    const removeButton = page.locator('#clear')
    await removeButton.click()

    await expect(page.locator('.todo-item > p')).toHaveText('No tasks found!')

})

test("Test Case 04 - Search and Filter Functionality in todo App", async ( {page} ) => {


const newTodoInput = page.locator('#input-add')
    const addButton = page.locator("#add-btn")

    const tasks = ['task1', 'task2', 'task3', 'task4', 'task5']


    for (const task of tasks) {
        await newTodoInput.fill(task)
        await addButton.click()
    }



    await expect(page.locator('.todo-item')).toHaveText(['task1', 'task2', 'task3', 'task4', 'task5'])
    const addedTask = 'task2'
    const searchBar = page.locator('#search')
    await searchBar.fill(addedTask)

    const countToDo = await page.locator('.todo-item').count()
    expect(countToDo).toBe(1)

    const ToDo = page.locator('.todo-item')
    await expect(ToDo).toHaveText(addedTask)

})

test("Test Case 05 - Task Validation and Error Handling", async ( { page }) => {

  const addButton = page.locator("#add-btn")
  await addButton.click()

  await expect(page.locator('.todo-item > p')).toHaveText('No tasks found!')

  const newTodoInput = page.locator('#input-add')
  await newTodoInput.fill("qwertyuiopaqweqweqsdfghjklmnbvcxz12345678")
  await addButton.click()

  const errorMessage = page.locator('.notification')

 await expect(errorMessage).toHaveText('Error: Todo cannot be more than 30 characters!')

 const taskName = 'task1'

 await newTodoInput.fill(taskName)
 await addButton.click()
 const countToDo = await page.locator('.todo-item').count()
 expect(countToDo).toBe(1)


 await newTodoInput.fill(taskName)
 await addButton.click()
 await expect(errorMessage).toHaveText(`Error: You already have ${taskName} in your todo list.`)

})