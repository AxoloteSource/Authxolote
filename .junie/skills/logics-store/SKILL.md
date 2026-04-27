---
name: logics-store
description: Guide for creating StoreLogics in the project
globs: app/Logics/**/*StoreLogic.php
---

### AI Agent Skills Guide: Logics (StoreLogic)

This guide details how to create and use `Logics` within this project's ecosystem, specifically `StoreLogic`. These components encapsulate the business logic for creating new resources and are used in controllers via dependency injection.

#### 1. Usage from the Controller
`Logics` are injected directly into controller methods along with Data Objects.

```php
class UserController extends Controller
{
    public function store(UserStoreData $data, UserStoreLogic $logic): JsonResponse
    {
        // Execute the logic's run method passing the received data
        return $logic->run($data);
    }
}
```

#### 2. Logic Lifecycle
The main execution flow of a `StoreLogic` follows this order:
1.  `before()`: Pre-validations and business rules.
2.  `action()`: Business logic execution (filling the model and saving).
3.  `after()`: Additional logic after the model is saved (e.g., sending emails).
4.  `response()`: Returning the response with `HTTP 201 Created`.

#### 3. Validations in `before()`
Used for business rules or permissions. If it returns `false`, execution stops and an error is returned. Use the `error()` method inherited from `CoreLogic`.

```php
protected function before(): bool
{
    if (! auth()->user()->can('create_users')) {
        return $this->error(
            message: 'You do not have permission to create users.',
            status: Http::Forbidden
        );
    }

    return true; // Continue execution
}
```

#### 4. Automatic Action Logic
`StoreLogic` provides a default `action()` implementation that fills the model with input data and saves it.

```php
public function action(): self
{
    // Default implementation:
    // $this->model->fill($this->input->toArray())->save();
    // $this->response = collect($this->model->toArray());

    return $this;
}
```
You can override `action()` if you need more complex creation logic.

#### 5. Post-Action Logic with `after()`
Executed after the model has been saved to the database. Useful for side effects.

```php
protected function after(): bool
{
    // Logic after saving, e.g., assigning default roles
    $this->model->assignRole('user');
    
    return true;
}
```

#### 6. Response Transformation with `withResource()`
Allows transforming the created model before sending it to the final response.

```php
protected function withResource(): mixed
{
    return new UserResource($this->model);
}
```

#### Full Implementation Example
```php
class UserStoreLogic extends StoreLogic
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
        // Check for specific conditions
        if (User::where('email', $this->input->email)->exists()) {
             return $this->error('Email already exists');
        }
        return true;
    }

    protected function withResource(): mixed
    {
        return new UserResource($this->model);
    }
}
```
