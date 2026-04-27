---
name: logics-show
description: Guide for creating ShowLogics in the project
globs: app/Logics/**/*ShowLogic.php
---

### AI Agent Skills Guide: Logics (ShowLogic)

This guide details how to create and use `Logics` within this project's ecosystem, specifically `ShowLogic`. These components encapsulate the business logic for retrieving a single resource and are used in controllers via dependency injection.

#### 1. Usage from the Controller
`Logics` are injected directly into controller methods along with Data Objects.

```php
class UserController extends Controller
{
    public function show(UserShowData $data, UserShowLogic $logic): JsonResponse
    {
        // Execute the logic's run method passing the received data
        return $logic->run($data);
    }
}
```

#### 2. Logic Lifecycle
The main execution flow of a `ShowLogic` follows this order:
1.  `before()`: Pre-validations and finding the model by ID (default behavior).
2.  `action()`: Business logic execution (querying the model).
3.  `after()`: Additional logic after the record is retrieved.
4.  `response()`: Returning the response with the resource or `HTTP 404 Not Found`.

#### 3. Validations and Model Finding in `before()`
By default, `ShowLogic` tries to find the model using `$this->input->id`. If not found, it returns an error with status code 404.

```php
protected function before(): bool
{
    // Default implementation:
    // $foundModel = $this->model->find($this->input->id);
    // if (is_null($foundModel)) {
    //     return $this->error(message: 'Not Found', status: Http::NotFound);
    // }
    // $this->model = $foundModel;

    // You can add extra validations here
    if (! auth()->user()->can('view', $this->model)) {
        return $this->error('Unauthorized', status: Http::Forbidden);
    }

    return true;
}
```

#### 4. Custom Query with `makeQuery()`
You can customize how the record is retrieved by overriding `makeQuery()`. By default, it looks for a `scopeShow()` or `show()` method on the model, or uses `where('id', $this->input->id)`.

```php
protected function makeQuery(): Builder
{
    // Return a Builder with eager loading or specific conditions
    return $this->model->newQuery()->with('roles')->where('is_active', true);
}
```

#### 5. Post-Action Logic with `after()`
Executed after the query has been processed.

```php
protected function after(): bool
{
    // Additional logic, e.g., logging
    Log::info("Viewed record: " . $this->model->id);
    
    return true;
}
```

#### 6. Response Transformation with `withResource()`
Allows transforming the found model before sending it to the final response.

```php
protected function withResource(): mixed
{
    return new UserResource($this->model);
}
```

#### Full Implementation Example
```php
class UserShowLogic extends ShowLogic
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function run(Data $input): JsonResponse|StreamedResponse
    {
        // The base class logic() method handles the lifecycle
        return $this->logic($input);
    }

    protected function before(): bool
    {
        if (! parent::before()) return false;
        
        return auth()->user()->can('view', $this->model);
    }

    protected function makeQuery(): Builder
    {
        return parent::makeQuery()->with(['roles', 'profile']);
    }

    protected function withResource(): mixed
    {
        return new UserResource($this->model);
    }
}
```
