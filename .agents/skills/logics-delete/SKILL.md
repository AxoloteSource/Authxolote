---
name: logics-delete
description: Guide for creating DeleteLogics in the project
globs: app/Logics/**/*DeleteLogic.php
---

### AI Agent Skills Guide: Logics (DeleteLogic)

This guide details how to create and use `Logics` within this project's ecosystem, specifically `DeleteLogic`. These components encapsulate the business logic for deleting records from the database and are used in controllers via dependency injection.

#### 1. Usage from the Controller
`Logics` are injected directly into controller methods along with Data Objects.

```php
class UserController extends Controller
{
    public function destroy(FlowByIdData $data, UserDeleteLogic $logic): JsonResponse
    {
        // Execute the logic's run method passing the received data
        return $logic->run($data);
    }
}
```

#### 2. Logic Lifecycle
The main execution flow of a `DeleteLogic` follows this order:
1.  `before()`: Pre-validations and business rules.
2.  `action()`: Business logic execution (finding the model and deleting it).
3.  `after()`: Additional logic after deletion (e.g., logging).
4.  `response()`: Returning the response with `HTTP 204 No Content`.

#### 3. Validations in `before()`
Used for business rules or permissions. If it returns `false`, execution stops and an error is returned.

```php
protected function before(): bool
{
    if (! auth()->user()->can('delete_users')) {
        return $this->error(
            message: 'You do not have permission to delete users.',
            status: Http::Forbidden
        );
    }

    return true; // Continue execution
}
```

#### 4. Custom Query with `makeQuery()`
By default, `DeleteLogic` uses the model's `remove()` method if it exists, or searches by the `id` property from the input. You can override it to customize how the record is found.

```php
protected function makeQuery(): Builder
{
    // Custom way to find the record to delete
    return $this->model->newQuery()
        ->where('uuid', $this->input->uuid);
}
```

#### 5. Post-Action Logic with `after()`
Executed after the record has been deleted from the database.

```php
protected function after(): bool
{
    // Logic after deletion, e.g., logging
    Log::info("User " . auth()->id() . " deleted user " . $this->model->id);
    
    return true;
}
```

#### 6. Response Transformation with `withResource()`
Allows returning data about the deleted resource (though standard 204 response usually doesn't have a body). In `DeleteLogic`, the `response()` method defaults to returning `Http::NoContent`.

#### Full Implementation Example
```php
class UserDeleteLogic extends DeleteLogic
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function run(Data $input): JsonResponse
    {
        // The base class logic() method handles the lifecycle
        return $this->logic($input);
    }

    protected function before(): bool
    {
        if ($this->model->isAdmin()) {
             return $this->error('Admin users cannot be deleted');
        }
        return true;
    }
}
```
