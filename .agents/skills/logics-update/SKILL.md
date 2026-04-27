---
name: logics-update
description: Guide for creating UpdateLogics in the project
globs: app/Logics/**/*UpdateLogic.php
---

### AI Agent Skills Guide: Logics (UpdateLogic)

This guide details how to create and use `Logics` within this project's ecosystem, specifically `UpdateLogic`. These components encapsulate the business logic for updating existing resources and are used in controllers via dependency injection.

#### 1. Usage from the Controller
`Logics` are injected directly into controller methods along with Data Objects.

```php
class UserController extends Controller
{
    public function update(UserUpdateData $data, UserUpdateLogic $logic): JsonResponse
    {
        // Execute the logic's run method passing the received data
        return $logic->run($data);
    }
}
```

#### 2. Logic Lifecycle
The main execution flow of an `UpdateLogic` follows this order:
1.  `before()`: Pre-validations and business rules. By default, it finds the model by `$this->input->id`.
2.  `action()`: Business logic execution (filling the model and saving).
3.  `after()`: Additional logic after the model is updated (e.g., logging changes).
4.  `response()`: Returning the response with `HTTP 200 OK`.

#### 3. Validations in `before()`
Used for business rules or permissions. By default, `UpdateLogic` uses `before()` to find the model by ID. If not found, it returns a 404 error.

```php
protected function before(): bool
{
    // Default implementation:
    // $foundModel = $this->model->find($this->input->id);
    // if (is_null($foundModel)) {
    //     return $this->error(message: 'Not Found', status: Http::NotFound);
    // }
    // $this->model = $foundModel;

    if (! auth()->user()->can('update_users')) {
        return $this->error(
            message: 'You do not have permission to update users.',
            status: Http::Forbidden
        );
    }

    return parent::before(); // Always call parent::before() to ensure the model is found
}
```

#### 4. Automatic Action Logic
`UpdateLogic` provides a default `action()` implementation that fills the model with input data and saves it.

```php
public function action(): self
{
    // Default implementation:
    // $this->model->fill($this->input->toArray());
    // $this->model->save();
    // $this->response = collect($this->model);

    return $this;
}
```
You can override `action()` if you need more complex update logic.

#### 5. Post-Action Logic with `after()`
Executed after the model has been updated in the database. Useful for side effects or logging.

```php
protected function after(): bool
{
    // Logic after updating
    Log::info("User {$this->model->id} has been updated.");
    
    return true;
}
```

#### 6. Response Transformation with `withResource()`
Allows transforming the updated model before sending it to the final response.

```php
protected function withResource(): mixed
{
    return new UserResource($this->model);
}
```

#### Full Implementation Example
```php
class UserUpdateLogic extends UpdateLogic
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
        if (! parent::before()) {
            return false;
        }

        // Additional checks, for example, if the user owns the record
        if ($this->model->user_id !== auth()->id()) {
            return $this->error('Unauthorized access to this resource', status: Http::Forbidden);
        }

        return true;
    }

    protected function withResource(): mixed
    {
        return new UserResource($this->model);
    }
}
```
